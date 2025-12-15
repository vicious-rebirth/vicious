import { Atom, FieldReference, U32 } from "@repo/core/schema";
import { Emit } from "./emit";

export class Encoder extends Emit {
  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return `
      export function encode${typeName}(self: ${typeName}, ctx: EncodeContext): void {
        ${handler}
      }
    `;
  }

  protected emitAtom(atom: Atom): string {
    return "TODO";
  }

  protected emitStructField(
    _field: FieldReference,
    _type: string,
    handler: string
  ): string {
    return handler || "";
  }

  protected emitAllocate(
    _target: string,
    _type: string,
    _count: string
  ): string {
    return "";
  }

  protected emitWalk(type: string, target: string): string {
    return `encode${type}(${target}, ctx);`;
  }

  protected emitWalkType(typeId: string, target: string): string {
    return `encodeType(${typeId}, ${target}, ctx);`;
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
