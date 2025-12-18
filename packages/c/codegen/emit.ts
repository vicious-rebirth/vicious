import { Emit } from "@repo/core/backend";
import {
  Class,
  FieldReference,
  Struct,
  VariableReference,
} from "@repo/core/schema";
import { cg } from "@repo/core/util";

export abstract class CEmit extends Emit {
  /**
   * Override
   */

  protected abstract emitObject(obj: any, handler: string): string;

  /**
   * Internal
   */

  protected emitClass(cls: Class, handler: string): string {
    return this.emitObject(cls, handler);
  }

  protected emitStruct(struct: Struct, handler: string): string {
    return this.emitObject(struct, handler);
  }

  protected emitArrayType(type: string, count: string): string {
    return cg`${type}[${count}]`;
  }

  protected emitListType(type: string, _maxCount?: number): string {
    return cg`${type} *`;
  }

  protected emitType(type: string): string {
    return type;
  }

  protected emitIf(condition: string, true_: string, false_?: string): string {
    if (false_ !== undefined) {
      return cg`
        if (${condition}) {
          ${true_}
        } else {
          ${false_}
        }
      `;
    } else {
      return cg`
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
    if (size !== undefined) {
      return cg`
        for (U32 ${variable} = 0; ${variable} < ${size}; ${variable}++) {
          ${body}
        }
      `;
    } else {
      return cg`
        for (U32 ${variable} = 0;; ${variable}++) {
          ${body}
        }
      `;
    }
  }

  protected emitBreak(): string {
    return cg`break;`;
  }

  protected emitFieldReference(field: FieldReference): string {
    return cg`self->${field.__name}`;
  }

  protected emitVariableReference(v: VariableReference): string {
    return cg`${v.__name}`;
  }

  protected emitVariableDefinition(
    v: VariableReference,
    type: string,
    data: string
  ): string {
    return cg`${type} ${v.__name} = ${data};`;
  }

  protected emitLiteral(value: string): string {
    return cg`${value}`;
  }

  protected emitIsTrue(value: string): string {
    return value;
  }

  protected emitIsFalse(value: string): string {
    return cg`!(${value})`;
  }

  protected emitDot(target: string, prop: string): string {
    return cg`${target}.${prop}`;
  }

  protected emitOperation(
    operator: string,
    left: string,
    right: string
  ): string {
    return cg`(${left}) ${operator} (${right})`;
  }

  protected emitVersion(): string {
    return cg`__version`;
  }

  protected emitEnd(): string {
    return cg`__end`;
  }

  protected emitIndex(target: string, index: string): string {
    return cg`${target}[${index}]`;
  }

  protected emitAssign(target: string, value: string): string {
    return cg`${target} = ${value};`;
  }

  protected emitSeek(offset: string): string {
    return cg`ctx->seek(ctx, ${offset});`;
  }

  protected emitTell(): string {
    return cg`ctx->tell(ctx)`;
  }

  protected emitGetAssetFromMap(id: string): string {
    return cg`ctx->getId(ctx, ${id})`;
  }

  protected emitSetAssetInMap(
    id: string,
    type: string,
    target: string
  ): string {
    return cg`ctx->setId(ctx, ${id}, ${type}, &${target});`;
  }

  protected emitLog(scope: string, message: string): string {
    return cg`ctx->log(ctx, "${scope}", "${message}");`;
  }
}
