import { TSEmit } from "./emit";
import { EmptyEmit } from "@repo/core/backend";
import {
  ArrayType,
  Atom,
  BaseType,
  Class,
  FieldReference,
  ListType,
  U32,
} from "@repo/core/schema";
import {
  cg,
  getIDSortedClasses,
  getNameSortedDefinitions,
} from "@repo/core/util";

export function buildDecoder(): string {
  return [buildContext(), buildClass()].join("\n\n");
}

function buildContext(): string {
  return cg`
    export interface DecoderContext {
      getId: (id: ID) => any;
      setId: (id: ID, type: string, obj: any) => void;

      seek: (offset: number) => void;
      tell: () => number;

      readANY: () => ANY;
      readBOOL: () => BOOL;
      readU8: () => U8;
      readI8: () => I8;
      readU16: () => U16;
      readI16: () => I16;
      readU32: () => U32;
      readI32: () => I32;
      readF32: () => F32;

      error: (scope: string, message: string) => void;
    }
  `;
}

function buildClass(): string {
  const decoderFunctions = [
    ...buildDefinitionDecoders(),
    buildSwitchDecoder(),
  ].filter((v) => v);

  return cg`
    export class Decoder {
      public constructor(public readonly ctx: DecoderContext) {}

      ${decoderFunctions.join("\n\n")}
    }
  `;
}

function buildDefinitionDecoders(): string[] {
  return getNameSortedDefinitions().map((definition) => {
    const backend = new DefinitionDecoder();

    backend.visit(definition);

    return backend.output;
  });
}

function buildSwitchDecoder(): string {
  const cases: string[] = getIDSortedClasses()
    .map((cls) => {
      const backend = new SwitchDecoder();

      backend.visit(cls);

      return backend.output;
    })
    .filter((v) => v);

  return cg`
    public decodeType(typeId: number, self: any = {}): any {
      switch (typeId) {
        ${cases.join("\n")}
      }

      debugger;
      return null;
    }
  `;
}

class DefinitionDecoder extends TSEmit {
  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return cg`
      public decode${typeName}(self: any = {}): ${typeName} {
        ${handler}
        return self as ${typeName};
      }
    `;
  }

  protected emitAtom(atom: Atom): string {
    const typeName = atom.constructor.name;

    return cg`
      public decode${typeName}(self: any = {}): ${typeName} {
        return this.ctx.read${atom.constructor.name}();
      }
    `;
  }

  protected emitStructField<T>(
    field: FieldReference,
    type?: ArrayType<T> | ListType<T> | BaseType<T>,
    handler?: string
  ): string {
    const out: string[] = [];

    if (type) {
      out.push(`self.${field.__name} ??= {};`);
    }

    if (handler) {
      out.push(handler);
    }

    return out.join("\n");
  }

  protected emitMetadataHeader(): string {
    return cg`
      self.metadata ??= {};
      self.metadata.header ??= {};
      self.metadata.header = this.decodeMetadataHeader(self.metadata.header);
      const __version = self.metadata.header.version;
      const __end = self.metadata.header.end;
    `;
  }

  protected emitMetadataFooter(): string {
    return cg`
      self.metadata.footer ??= {};
      self.metadata.footer = this.decodeMetadataFooter(self.metadata.footer);
    `;
  }

  protected emitWalk<T>(
    type: ArrayType<T> | BaseType<T>,
    target: string
  ): string {
    if (type instanceof ArrayType) {
      const v = this.newVariable(U32);

      return cg`
        ${target} = new Array(${type.count}).fill(0).map(() => ({}));
        for (let ${v.__name} = 0; ${v.__name} < ${type.count}; ${v.__name}++) {
          ${this.emitWalk(type.type, this.emitIndex(target, v.__name))}
        }
      `;
    } else {
      return cg`
        ${target} = this.decode${this.getTypeName(type)}(${target});
      `;
    }
  }

  protected emitWalkType(typeId: string, target: string): string {
    return cg`
      ${target} = this.decodeType(${typeId}, ${target});
    `;
  }

  protected emitAllocate<T>(
    target: string,
    _type: ArrayType<T> | ListType<T>,
    count?: string
  ): string {
    if (count && count !== "0") {
      return cg`${target} = new Array(${count}).fill(0).map(() => ({}));`;
    } else {
      return cg`${target} = [];`;
    }
  }

  protected emitGrow<T>(
    target: string,
    _type: ArrayType<T> | ListType<T>,
    _index: string
  ): string {
    return cg`${target}.push({});`;
  }

  protected emitForward<T>(
    target: string,
    type: ArrayType<T> | ListType<T>,
    count: string
  ): string {
    const v = this.newVariable(U32);

    return cg`
      for (let ${v.__name} = 0; ${v.__name} < ${count}; ${v.__name}++) {
        ${this.emitWalk(type.type, this.emitIndex(target, v.__name))}
      }
    `;
  }
}

class SwitchDecoder extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`case ${cls.__id}: return this.decode${cls.constructor.name}(self);`;
  }
}
