import { EmptyEmit } from "@repo/core/backend";
import {
  ArrayType,
  Atom,
  BaseType,
  Class,
  FieldReference,
  ListType,
  Struct,
} from "@repo/core/src/schema/core";
import { cg, getDependencySortedDefinitions } from "@repo/core/util";

export function buildDocumentation(): string {
  return buildDocumentations().join("\n\n");
}

function buildDocumentations(): string[] {
  return getDependencySortedDefinitions().map((definition) => {
    const backend = new DocEmit();

    backend.visit(definition);

    return backend.output;
  });
}

export class DocEmit extends EmptyEmit {
  protected emitAtom(atom: Atom): string {
    const name = atom.constructor.name;
    const doc = atom.__doc?.trim();

    return cg`
      /**
      @class ${name}
      @brief ${doc || name}
      */
    `;
  }

  protected emitClass(cls: Class, fields: string): string {
    return this.emitObject(cls, fields);
  }

  protected emitStruct(struct: Struct, fields: string): string {
    return this.emitObject(struct, fields);
  }

  protected emitObject(obj: Class | Struct, fields: string): string {
    const name = obj.constructor.name;
    const todo = obj.__todo;
    const doc = obj.__doc?.trim();
    const offset = obj.__offset;
    const metadata = obj.__metadata;

    return cg`
      /**
      @class ${name}
      ${todo ? "@todo Not implemented" : ""}
      @brief ${doc || name}
      ${offset ? "@brief **SvS Offset** `0x" + offset.toString(16) + "`" : ""}
      ${metadata ? "@param metadata Metadata" : ""}
      ${fields}
      */
    `;
  }

  protected emitStructField<T>(
    field: FieldReference,
    type?: ArrayType<T> | ListType<T> | BaseType<T>,
    _handler?: string
  ): string {
    const t = this.getTypeString(type);
    const name = field.__name;
    const doc = field.__props?.doc;

    if (field.__name === "base") {
      return t ? `@extends ${t}` : "";
    } else {
      return t ? `@param ${name} ${t}${doc ? " - " : ""}${doc || ""}` : "";
    }
  }

  private getTypeString<T>(
    type?: ArrayType<T> | ListType<T> | BaseType<T>
  ): string | null {
    if (!type) return null;

    if (!type) return null;
    else if (type instanceof ArrayType)
      return `${this.getTypeString(type.type)}[${type.count}]`;
    else if (type instanceof ListType)
      return `${this.getTypeString(type.type)}[]`;
    else return type.name;
  }
}
