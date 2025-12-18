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

export function buildEncoder(): string {
  return [buildContext(), buildClass()].join("\n\n");
}

function buildContext(): string {
  return cg`
    export interface EncoderContext {
      getId: (id: ID) => any;
      setId: (id: ID, type: string, obj: any) => void;

      seek: (offset: number) => void;
      tell: () => number;

      writeANY: (self: ANY) => void;
      writeBOOL: (self: BOOL) => void;
      writeU8: (self: U8) => void;
      writeI8: (self: I8) => void;
      writeU16: (self: U16) => void;
      writeI16: (self: I16) => void;
      writeU32: (self: U32) => void;
      writeI32: (self: I32) => void;
      writeF32: (self: F32) => void;

      error: (scope: string, message: string) => void;
    }
  `;
}

function buildClass(): string {
  const functions = [...buildDefinitionEncoders(), buildSwitchEncoder()].filter(
    (v) => v
  );

  return cg`
    export class Encoder {
      public constructor(public readonly ctx: EncoderContext) {}

      ${functions.join("\n\n")}
    }
  `;
}

function buildDefinitionEncoders(): string[] {
  return getNameSortedDefinitions().map((definition) => {
    const backend = new DefinitionEncoder();

    backend.visit(definition);

    return backend.output;
  });
}

function buildSwitchEncoder(): string {
  const cases: string[] = getIDSortedClasses()
    .map((cls) => {
      const backend = new SwitchEncoder();

      backend.visit(cls);

      return backend.output;
    })
    .filter((v) => v);

  return cg`
    public encodeType(typeId: number, self: any): void {
      switch (typeId) {
        ${cases.join("\n")}
      }
    }
  `;
}

class DefinitionEncoder extends TSEmit {
  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return cg`
      public encode${typeName}(self: ${typeName}): void {
        ${handler}
      }
    `;
  }

  protected emitAtom(atom: Atom): string {
    const typeName = (atom.constructor as any).name;

    return cg`
      public encode${typeName}(self: ${typeName}): void {
        this.ctx.write${typeName}(self);
      }
    `;
  }

  protected emitStructField<T>(
    _field: FieldReference,
    _type?: ArrayType<T> | ListType<T> | BaseType<T>,
    handler?: string
  ): string {
    return handler || "";
  }

  protected emitAllocate<T>(
    _target: string,
    _type: ArrayType<T> | ListType<T>,
    _count: string
  ): string {
    return "";
  }

  protected emitGrow<T>(
    _target: string,
    _type: ArrayType<T> | ListType<T>,
    _index: string
  ): string {
    return "";
  }

  protected emitMetadataHeader(): string {
    return cg`
      this.encodeMetadataHeader((self as any).metadata.header);
      const __start = this.ctx.tell() - 12;
      const __version = (self as any).metadata.header.version;
    `;
  }

  protected emitMetadataFooter(): string {
    return cg`
      this.encodeMetadataFooter((self as any).metadata.footer);
      const __ptr = this.ctx.tell();
      this.ctx.seek(__start + 4);
      this.encodeU32(__ptr - 4);
      this.ctx.seek(__ptr);
    `;
  }

  protected emitWalk<T>(
    type: ArrayType<T> | BaseType<T>,
    target: string
  ): string {
    if (type instanceof ArrayType) {
      const v = this.newVariable(U32);

      return cg`
        for (let ${v.__name} = 0; ${v.__name} < ${type.count}; ${v.__name}++) {
          ${this.emitWalk(type.type, this.emitIndex(target, v.__name))}
        }
      `;
    } else {
      return cg`this.encode${this.getTypeName(type)}(${target});`;
    }
  }

  protected emitWalkType(typeId: string, target: string): string {
    return cg`this.encodeType(${typeId}, ${target});`;
  }

  protected emitForward<T>(
    target: string,
    type: ArrayType<T> | ListType<T>,
    count: string
  ): string {
    const v = this.newVariable(U32);

    return cg`
      for (let ${v.__name} = 0; ${v.__name} < ${count}; ${v.__name}++) {
        ${this.emitWalk((type as any).type || type, this.emitIndex(target, v.__name))}
      }
    `;
  }

  protected emitAssign(target: string, value: string): string {
    if (target.startsWith("self.")) return "";

    return super.emitAssign(target, value);
  }

  protected emitEnd(): string {
    return "1";
  }
}

class SwitchEncoder extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`case ${cls.__id}: return this.encode${(cls.constructor as any).name}(self);`;
  }
}
