import { U32 } from "../../schema/types/atomic";
import {
  AtomicCodec,
  ClassCodec,
  Codec,
  FieldReference,
  MetadataCodec,
  VariableReference,
} from "../../schema/core";
import { CodecBackend } from "./core";

class TSCodec extends CodecBackend {
  /**
   * Override
   */

  protected emitObject(obj: any, handler: string): string {
    return "";
  }

  protected emitAtomic(atom: AtomicCodec): string {
    return "";
  }

  protected emitStructField(
    field: FieldReference,
    type: string,
    handler?: string
  ): string {
    return "";
  }

  protected emitWalk(type: string, target: string): string {
    return "";
  }

  protected emitWalkType(typeId: string, target: string): string {
    return "";
  }

  protected emitAllocate(target: string, _type: string, count: string): string {
    return "";
  }

  protected emitForward(target: string, type: string, count: string): string {
    return "";
  }

  /**
   * Internal
   */

  protected emitClass(cls: ClassCodec, handler: string): string {
    return this.emitObject(cls, handler);
  }

  protected emitMetadataStruct(struct: MetadataCodec, handler: string): string {
    return this.emitObject(struct, handler);
  }

  protected emitStruct(struct: Codec, handler: string): string {
    return this.emitObject(struct, handler);
  }

  protected emitArrayType(type: string, _count: string): string {
    return `${type}[]`;
  }

  protected emitListType(type: string, maxCount?: number): string {
    return `${type}[]`;
  }

  protected emitType(type: string): string {
    return type;
  }

  protected emitIf(condition: string, true_: string, false_?: string): string {
    if (false_ !== undefined) {
      return `
        if (${condition}) {
          ${true_}
        } else {
          ${false_}
        }
      `;
    } else {
      return `
        if (${condition}) {
          ${true_}
        }
      `;
    }
  }

  protected emitFor(
    variable: string,
    size: string | undefined,
    body: string
  ): string {
    return `
      for (${variable} = 0; ${variable} < ${size}; ${variable}++) {
        ${body}
      }
    `;
  }

  protected emitBreak(): string {
    return "break;";
  }

  protected emitFieldReference(field: FieldReference): string {
    return `self.${field.name}`;
  }

  protected emitVariableReference(v: VariableReference): string {
    return v.name;
  }

  protected emitVariableDefinition(
    v: VariableReference,
    type: string,
    data: string
  ): string {
    return `let ${v.name}: ${type} = ${data};`;
  }

  protected emitLiteral(value: string): string {
    return value;
  }

  protected emitNot(value: string): string {
    return `!(${value})`;
  }

  protected emitOperation(
    operator: string,
    left: string,
    right: string
  ): string {
    return `(${left}) ${operator} (${right})`;
  }

  protected emitVersion(): string {
    return "__version";
  }

  protected emitEnd(): string {
    return "__end";
  }

  protected emitIndex(target: string, index: string): string {
    return `${target}[${index}]`;
  }

  protected emitAssign(target: string, value: string): string {
    return `${target} = ${value}`;
  }

  protected emitSeek(offset: string): string {
    return `ctx.seek(${offset});`;
  }

  protected emitTell(): string {
    return `ctx.tell()`;
  }

  protected emitGetAssetFromMap(id: string): string {
    return `ctx.getId(${id})`;
  }

  protected emitSetAssetInMap(id: string, target: string): string {
    return `ctx.setId(${id}, ${target})`;
  }

  protected emitError(scope: string, message: string): string {
    return `throw \"${scope}: ${message}\";`;
  }
}

export class TSDecoder extends TSCodec {
  public constructor() {
    super(true);
  }

  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return `
      export function decode${typeName}(ctx: DecodeContext, self: any = {}): ${typeName} {
        ${handler}
        return self as ${typeName};
      }
    `;
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

export class TSEncoder extends TSCodec {
  public constructor() {
    super(false);
  }

  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return `
      export function encode${typeName}(self: ${typeName}, ctx: EncodeContext): void {
        ${handler}
      }
    `;
  }

  protected emitStructField(
    _field: FieldReference,
    _type: string,
    handler: string
  ): string {
    return handler || "";
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
