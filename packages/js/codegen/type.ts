import { Class, FieldReference, Struct } from "@repo/core/schema";
import { EmptyEmit } from "@repo/core/backend";
import { cg, getNameSortedDefinitions } from "@repo/core/util";

export function buildTypes(): string {
  return cg`
    ${buildAtoms().join("\n\n")}

    ${buildInterfaces().join("\n\n")}
  `;
}

export function buildAtoms(): string[] {
  return [
    "export type ANY = any;",
    "export type BOOL = boolean;",
    "export type U8 = number;",
    "export type I8 = number;",
    "export type U16 = number;",
    "export type I16 = number;",
    "export type U32 = number;",
    "export type I32 = number;",
    "export type F32 = number;",
  ];
}

export function buildInterfaces(): string[] {
  return getNameSortedDefinitions().map((definition) => {
    const decoder = new TypeEmit();

    decoder.visit(definition);

    return decoder.output;
  });
}

class TypeEmit extends EmptyEmit {
  protected emitClass(cls: Class, fields: string): string {
    return cg`
      export interface ${cls.constructor.name} {
        ${fields}
      }
    `;
  }

  protected emitStruct(struct: Struct, fields: string): string {
    return cg`
      export interface ${struct.constructor.name} {
        ${fields}
      }
    `;
  }

  protected emitStructField(
    field: FieldReference,
    type?: string,
    _handler?: string
  ): string {
    if (type !== undefined) {
      return cg`${field.__name}: ${type};`;
    }

    return "";
  }

  protected emitType(type: string): string {
    return type;
  }

  protected emitArrayType(type: string, _count: string): string {
    return cg`${type}[]`;
  }

  protected emitListType(type: string, _maxCount?: number): string {
    return cg`${type}[]`;
  }
}
