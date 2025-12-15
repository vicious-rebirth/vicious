import {
  ClassCodec,
  Codec,
  FieldReference,
  MetadataCodec,
  VariableReference,
} from "@repo/core/schema";
import { Emit as CoreEmit } from "@repo/core/backend";

export abstract class Emit extends CoreEmit {
  /**
   * Override
   */

  protected abstract emitObject(obj: any, handler: string): string;

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

  protected emitMetadataHeader(): string {
    return "";
  }

  protected emitMetadataFooter(): string {
    return "";
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
