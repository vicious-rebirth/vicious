import { EmptyEmit } from "@repo/core/backend";
import {
  ArrayType,
  BaseType,
  Class,
  FieldReference,
  ListType,
  Struct,
} from "@repo/core/schema";
import { cg, getDependencySortedDefinitions } from "@repo/core/util";

export function buildTypes(): string {
  return cg`
    #include <stdbool.h>
    #include <stdint.h>

    ${buildAtoms().join("\n")}

    ${buildStructs()
      .filter((v) => v)
      .join("\n\n")}
  `;
}

export function buildAtoms(): string[] {
  return [
    "typedef void *ANY;",
    "typedef bool BOOL;",
    "typedef uint8_t U8;",
    "typedef int8_t I8;",
    "typedef uint16_t U16;",
    "typedef int16_t I16;",
    "typedef uint32_t U32;",
    "typedef int32_t I32;",
    "typedef float F32;",
  ];
}

export function buildStructs(): string[] {
  return getDependencySortedDefinitions().map((definition) => {
    const decoder = new TypeEmit();

    decoder.visit(definition);

    return decoder.output;
  });
}

class TypeEmit extends EmptyEmit {
  protected emitClass(cls: Class, fields: string): string {
    fields = [cls.__metadata ? "Metadata metadata;" : "", fields]
      .filter((v) => v)
      .join("\n");

    return cg`
      typedef struct {
        ${fields}
      } ${cls.constructor.name};
    `;
  }

  protected emitStruct(struct: Struct, fields: string): string {
    fields = [struct.__metadata ? "Metadata metadata;" : "", fields]
      .filter((v) => v)
      .join("\n");

    return cg`
      typedef struct {
        ${fields}
      } ${struct.constructor.name};
    `;
  }

  protected emitStructField<T>(
    field: FieldReference,
    type?: ArrayType<T> | ListType<T> | BaseType<T>,
    _handler?: string
  ): string {
    if (type instanceof ArrayType) {
      return cg`${this.getTypeName(type.type)} ${field.__name}[${type.count}];`;
    } else if (type instanceof ListType) {
      return cg`${this.getTypeName(type.type)} *${field.__name};`;
    } else if (type !== undefined) {
      return cg`${this.getTypeName(type)} ${field.__name};`;
    } else {
      return "";
    }
  }

  protected emitType(type: string): string {
    return type;
  }

  protected emitArrayType(type: string, count: string): string {
    return cg`${type}[${count}]`;
  }

  protected emitListType(type: string, _maxCount?: number): string {
    return cg`${type} *`;
  }
}
