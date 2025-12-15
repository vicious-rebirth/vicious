import { Atom, Class, FieldReference, U32 } from "@repo/core/schema";
import {
  cg,
  getIDSortedClasses,
  getNameSortedDefinitions,
} from "@repo/core/util";
import { TSEmit } from "./emit";
import { EmptyEmit } from "@repo/core/backend";

export function buildDecoder(): string {
  return cg`
    ${buildContext()}

    ${buildClass()}
  `;
}

function buildContext(): string {
  return cg`
    export interface DecodeContext {
      seek: (offset: number) => void;
      tell: () => number;
    }
  `;
}

function buildClass(): string {
  const decoderFunctions = [...buildDefinitionDecoders(), buildSwitchDecoder()];

  return cg`
    export class Decoder {
      ${decoderFunctions.join("\n\n")}
    }
  `;
}

function buildDefinitionDecoders(): string[] {
  const decoder = new DefinitionDecoder();

  return getNameSortedDefinitions().map((definition) => {
    decoder.visit(definition);
    return decoder.popOutput();
  });
}

function buildSwitchDecoder(): string {
  const decoder = new SwitchDecoder();

  const cases: string[] = getIDSortedClasses().map((cls) => {
    decoder.visit(cls);

    return decoder.popOutput();
  });

  return cg`
    public decodeType(typeId: number, ctx: DecodeContext, self?: any = {}): any {
      switch (typeId) {
        ${cases.join("\n")}
      }
    }
  `;
}

class DefinitionDecoder extends TSEmit {
  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return cg`
      public decode${typeName}(ctx: DecodeContext, self: any = {}): ${typeName} {
        ${handler}
        return self as ${typeName};
      }
    `;
  }

  protected emitAtom(atom: Atom): string {
    const typeName = atom.constructor.name;

    return cg`
      public decode${typeName}(ctx: DecodeContext, self: any = {}): ${typeName} {
        return ctx.read${atom.constructor.name}(ctx);
      }
    `;
  }

  protected emitStructField(
    field: FieldReference,
    type?: string,
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
      self.metadata.header = this.decodeMetadataHeader(ctx, self.metadata.header);
      const __version = self.metadata.header.version;
      const __end = self.metadata.header.end;
    `;
  }

  protected emitMetadataFooter(): string {
    return cg`
      self.metadata.footer ??= {};
      self.metadata.footer = this.decodeMetadataFooter(ctx, self.metadata.footer);
    `;
  }

  protected emitWalk(type: string, target: string): string {
    return cg`${target} = this.decode${type}(ctx, ${target});`;
  }

  protected emitWalkType(typeId: string, target: string): string {
    return cg`${target} = this.decodeType(${typeId}, ctx, ${target});`;
  }

  protected emitAllocate(target: string, _type: string, count: string): string {
    return cg`${target} = new Array(${count}).fill(0).map(() => ({}));`;
  }

  protected emitForward(target: string, type: string, count: string): string {
    const v = this.newVariable(U32);

    return cg`
      for (let ${v.__name} = 0; ${v.__name} < ${count}; ${v.__name}++) {
        ${this.emitWalk(type, this.emitIndex(target, v.__name))}
      }
    `;
  }
}

class SwitchDecoder extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`case ${cls.__id}: return this.decode${cls.constructor.name}(ctx, self);`;
  }
}
