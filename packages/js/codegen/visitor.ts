import {
  ArrayType,
  Atom,
  BaseType,
  Class,
  FieldReference,
  ListType,
  U32,
} from "@repo/core/schema";
import { TSEmit } from "./emit";
import {
  cg,
  getIDSortedClasses,
  getNameSortedDefinitions,
} from "@repo/core/util";
import { EmptyEmit } from "@repo/core/backend";

export function buildVisitor(): string {
  return buildClass();
}

function buildClass(): string {
  const functions = [...buildDefinitionVisitors(), buildSwitchVisitor()].filter(
    (v) => v
  );

  return cg`
    export class Visitor {
      public visitField(name: string, type: string): BOOL { return true; }

      public enterType(name: string): BOOL { return true; }
      public exitType(name: string): void {}

      public visitError(scope: string, message: string): void {}

      ${functions.join("\n\n")}
    }
  `;
}

function buildDefinitionVisitors(): string[] {
  return getNameSortedDefinitions().map((definition) => {
    const backend = new DefinitionVisitor();

    backend.visit(definition);

    return backend.output;
  });
}

function buildSwitchVisitor(): string {
  const cases: string[] = getIDSortedClasses()
    .map((cls) => {
      const backend = new SwitchVisitor();

      backend.visit(cls);

      return backend.output;
    })
    .filter((v) => v);

  return cg`
    public visitType(self: any, typeId: number): void {
      switch (typeId) {
        ${cases.join("\n")}
      }
    }
  `;
}

class DefinitionVisitor extends TSEmit {
  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return cg`
      public visit${typeName}(self: ${typeName}): void {
        if (!this.enterType("${typeName}")) return;

        ${handler}

        this.exitType("${typeName}");
      }
    `;
  }

  protected emitAtom(atom: Atom): string {
    const typeName = atom.constructor.name;

    return cg`public visit${typeName}(self: ${typeName}): void {
      if (!this.enterType("${typeName}")) return;

      this.exitType("${typeName}");
    }`;
  }

  protected emitStructField<T>(
    _field: FieldReference,
    _type?: ArrayType<T> | ListType<T> | BaseType<T>,
    handler?: string
  ): string {
    return handler || "";
  }

  protected emitAllocate<T>(
    _target: string,
    _type: ArrayType<T> | ListType<T>,
    _count: string
  ): string {
    return "";
  }

  protected emitGrow<T>(
    _target: string,
    _type: ArrayType<T> | ListType<T>,
    _index: string
  ): string {
    return "";
  }

  protected emitMetadataHeader(): string {
    return cg`const __version = (self as any).metadata.header.version;`;
  }

  protected emitMetadataFooter(): string {
    return "";
  }

  protected emitWalk<T>(
    type: ArrayType<T> | BaseType<T>,
    target: string
  ): string {
    if (type instanceof ArrayType) {
      const v = this.newVariable(U32);

      return cg`
        for (let ${v.__name} = 0; ${v.__name} < ${type.count}; ${v.__name}++) {
          ${this.emitWalk(type.type, this.emitIndex(target, v.__name))}
        }
      `;
    } else {
      const typeName = this.getTypeName(type);

      if (target.startsWith("self.")) {
        const match = target.match(/self\.([^\[]+)(\[(.+)\])?/);

        let fieldName: string;
        if (match?.[3]) {
          fieldName = `\`${match[1]}[\${${match[3]}}]\``;
        } else {
          fieldName = `"${match![1]}"`;
        }

        return cg`if (this.visitField(${fieldName}, "${typeName}")) this.visit${typeName}(${target});`;
      } else {
        return cg`this.visit${typeName}(${target});`;
      }
    }
  }

  protected emitWalkType(typeId: string, target: string): string {
    if (target.startsWith("self.")) {
      const match = target.match(/self\.([^\[]+)(\[(.+)\])?/);

      let fieldName: string;
      if (match?.[4]) {
        fieldName = `\`${match[1]}[\${${match[4]}}]\``;
      } else {
        fieldName = `"${match![1]}"`;
      }

      return cg`if (this.visitField(${fieldName}, getClassFromID(${typeId}))) this.visitType(${typeId}, ${target});`;
    } else {
      return cg`this.visitType(${typeId}, ${target});`;
    }
  }

  protected emitForward<T>(
    target: string,
    type: ArrayType<T> | ListType<T>,
    count: string
  ): string {
    const v = this.newVariable(U32);

    return cg`
      for (let ${v.__name} = 0; ${v.__name} < ${count}; ${v.__name}++) {
        ${this.emitWalk(type.type, this.emitIndex(target, v.__name))}
      }
    `;
  }

  protected emitAssign(_target: string, _value: string): string {
    return "";
  }

  protected emitSeek(_offset: string): string {
    return "";
  }

  protected emitTell(): string {
    return "0";
  }

  protected emitSetAssetInMap(
    _id: string,
    _type: string,
    _target: string
  ): string {
    return "";
  }

  protected emitEnd(): string {
    return "0";
  }

  protected emitError(scope: string, message: string): string {
    return `this.visitError("${scope}", "${message}");`;
  }
}

class SwitchVisitor extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`case ${cls.__id}: return this.visit${cls.constructor.name}(self);`;
  }
}
