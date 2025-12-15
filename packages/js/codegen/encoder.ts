import { Atom, FieldReference, U32 } from "@repo/core/schema";
import { TSEmit } from "./emit";
import { cg } from "@repo/core/util";

export class Encoder extends TSEmit {
  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return cg`
      export function encode${typeName}(self: ${typeName}, ctx: EncodeContext): void {
        ${handler}
      }
    `;
  }

  protected emitAtom(atom: Atom): string {
    const typeName = atom.constructor.name;

    return cg`
      export function encode${typeName}(self: ${typeName}, ctx: EncodeContext): void {
        ctx.write${typeName}(self);
      }
    `;
  }

  protected emitStructField(
    _field: FieldReference,
    _type?: string,
    handler?: string
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

  protected emitMetadataHeader(): string {
    return cg`
      encodeMetadataHeader(ctx.metadata.header, ctx);
      const __start = ctx.tell() - 12;
      const __version = ctx.metadata.header.version;
      const __end = ctx.metadata.header.end;
    `;
  }

  protected emitMetadataFooter(): string {
    return cg`
      encodeMetadataFooter(ctx.metadata.footer, ctx);
      const __ptr = ctx.tell();
      ctx.seek(__start + 4);
      encodeU32(__ptr - 4, ctx);
      ctx.seek(__ptr);
    `;
  }

  protected emitWalk(type: string, target: string): string {
    return cg`encode${type}(${target}, ctx);`;
  }

  protected emitWalkType(typeId: string, target: string): string {
    return cg`encodeType(${typeId}, ${target}, ctx);`;
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
