import { AtomicCodec, FieldReference, U32 } from "@repo/core/schema";
import { Emit } from "./emit";

export class Decoder extends Emit {
  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return `
      export function decode${typeName}(ctx: DecodeContext, self: any = {}): ${typeName} {
        ${handler}
        return self as ${typeName};
      }
    `;
  }

  protected emitAtomic(atom: AtomicCodec): string {
    return "TODO";
  }

  protected emitStructField(
    field: FieldReference,
    _type: string,
    handler?: string
  ): string {
    let out = `self.${field.name} ??= {};`;

    if (handler) {
      out += `\n${handler}`;
    }

    return out;
  }

  protected emitWalk(type: string, target: string): string {
    return `${target} = decode${type}(ctx, ${target});`;
  }

  protected emitWalkType(typeId: string, target: string): string {
    return `${target} = decodeType(${typeId}, ctx, ${target});`;
  }

  protected emitAllocate(target: string, _type: string, count: string): string {
    return `${target} = new Array(${count}).fill(0).map(() => ({}));`;
  }

  protected emitForward(target: string, type: string, count: string): string {
    const v = this.newVariable(U32);

    return `
      for (let ${v.name} = 0; ${v.name} < ${count}; ${v.name}++) { 
        ${this.emitWalk(type, this.emitIndex(target, v.name))}
      }
    `;
  }
}
