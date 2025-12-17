import {
  ArrayType,
  Atom,
  BaseType,
  Class,
  FieldReference,
  ListType,
  Struct,
  U32,
} from "@repo/core/schema";
import {
  cg,
  getIDSortedClasses,
  getNameSortedDefinitions,
} from "@repo/core/util";
import { CEmit } from "./emit";
import { EmptyEmit } from "@repo/core/backend";

export function buildVisitorDeclaration(): string {
  return [buildDeclarations().join("\n")].join("\n");
}

export function buildVisitorImplementation(): string {
  return [buildImplementations().join("\n\n")].join("\n\n");
}

function buildDeclarations(): string[] {
  return [
    buildContext() + "\n",
    ...buildDefinitionDeclarations(),
    buildSwitchDeclaration(),
  ].filter((v) => v);
}

function buildContext(): string {
  return cg`
    typedef struct VisitorContext {
      void (*error)(struct VisitorContext *ctx, const char *scope, const char *message);

      ${getNameSortedDefinitions()
        .map((d) => {
          const backend = new VisitorFunctionDefinition();

          backend.visit(d);

          return backend.output;
        })
        .filter((v) => v)
        .join("\n\n")}
    } VisitorContext;
  `;
}

function buildImplementations(): string[] {
  return [
    ...buildDefinitionImplementations(),
    buildSwitchImplementation(),
  ].filter((v) => v);
}

function buildDefinitionImplementations(): string[] {
  return getNameSortedDefinitions().map((definition) => {
    const backend = new DefinitionVisitorImplementation();

    backend.visit(definition);

    return backend.output;
  });
}

function buildDefinitionDeclarations(): string[] {
  return getNameSortedDefinitions().map((definition) => {
    const backend = new DefinitionVisitorDeclaration();

    backend.visit(definition);

    return backend.output;
  });
}

function buildSwitchDeclaration(): string {
  return cg`void visitType(VisitorContext *ctx, U32 typeId, void *self);`;
}

function buildSwitchImplementation(): string {
  return cg`
    void visitType(VisitorContext *ctx, U32 typeId, void *self) {
      switch (typeId) {
        ${getIDSortedClasses()
          .map((cls) => {
            const backend = new SwitchVisitorImplementation();

            backend.visit(cls);

            return backend.output;
          })
          .filter((v) => v)
          .join("\n")}
      }
    }
  `;
}

class DefinitionVisitorDeclaration extends EmptyEmit {
  protected emitObject(obj: any): string {
    const typeName = obj.constructor.name;

    return cg`void visit${typeName}(VisitorContext *ctx, ${typeName} *self);`;
  }

  protected emitClass(cls: Class, _fields: string): string {
    return this.emitObject(cls);
  }

  protected emitStruct(struct: Struct, _fields: string): string {
    return this.emitObject(struct);
  }

  protected emitAtom(atom: Atom): string {
    const typeName = atom.constructor.name;

    return cg`void visit${typeName}(VisitorContext *ctx, ${typeName} *self);`;
  }
}

class DefinitionVisitorImplementation extends CEmit {
  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return cg`
      void visit${typeName}(VisitorContext *ctx, ${typeName} *self) {
        if (ctx->enter${typeName} != 0){
          if (!ctx->enter${typeName}(ctx, self)) return;
        }

        ${handler}

        if (ctx->exit${typeName} != 0) ctx->exit${typeName}(ctx, self);
      }
    `;
  }

  protected emitAtom(atom: Atom): string {
    const typeName = atom.constructor.name;

    return cg`
      void visit${typeName}(VisitorContext *ctx, ${typeName} *self) {
        if (ctx->visit${typeName} != 0) ctx->visit${typeName}(ctx, self);
      }
    `;
  }

  protected emitStructField<T>(
    _field: FieldReference,
    _type?: ArrayType<T> | ListType<T> | BaseType<T>,
    handler?: string
  ): string {
    if (handler) return handler;
    else return "";
  }

  protected emitMetadataHeader(): string {
    return cg`
      visitMetadataHeader(ctx, &self->metadata.header);
      U32 __version = self->metadata.header.version;
    `;
  }

  protected emitMetadataFooter(): string {
    return cg`
      visitMetadataFooter(ctx, &self->metadata.footer);
    `;
  }

  protected emitWalk<T>(
    type: ArrayType<T> | BaseType<T>,
    target: string
  ): string {
    if (type instanceof ArrayType) {
      const v = this.newVariable(U32);

      return cg`
        for (U32 ${v.__name} = 0; ${v.__name} < ${type.count}; ${v.__name}++) {
          ${this.emitWalk(type.type, this.emitIndex(target, v.__name))}
        }
      `;
    } else {
      return cg`
        visit${this.getTypeName(type)}(ctx, &${target});
      `;
    }
  }

  protected emitWalkType(typeId: string, target: string): string {
    return cg`
      visitType(ctx, ${typeId}, ${target});
    `;
  }

  protected emitAllocate<T>(
    _target: string,
    _type: ArrayType<T> | ListType<T>,
    _count?: string
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

  protected emitForward<T>(
    _target: string,
    _type: ArrayType<T> | ListType<T>,
    _count: string
  ): string {
    return "";
  }

  protected emitAssign(target: string, value: string): string {
    if (target.startsWith("self->")) return "";

    return super.emitAssign(target, value);
  }

  protected emitSetAssetInMap(
    _id: string,
    _type: string,
    _target: string
  ): string {
    return "";
  }

  protected emitTell(): string {
    return "0";
  }

  protected emitSeek(_offset: string): string {
    return "";
  }

  protected emitEnd(): string {
    return "0";
  }
}

class SwitchVisitorImplementation extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`
      case ${cls.__id}: visit${cls.constructor.name}(ctx, (${cls.constructor.name} *)self); break;
    `;
  }
}

class VisitorFunctionDefinition extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`
      BOOL (*enter${cls.constructor.name})(struct VisitorContext *ctx, ${cls.constructor.name} *self);
      void (*exit${cls.constructor.name})(struct VisitorContext *ctx, ${cls.constructor.name} *self);
    `;
  }

  protected emitStruct(struct: Struct, _fields: string): string {
    return cg`
      BOOL (*enter${struct.constructor.name})(struct VisitorContext *ctx, ${struct.constructor.name} *self);
      void (*exit${struct.constructor.name})(struct VisitorContext *ctx, ${struct.constructor.name} *self);
    `;
  }

  protected emitAtom(atom: Atom): string {
    return cg`
      void (*visit${atom.constructor.name})(struct VisitorContext *ctx, ${atom.constructor.name} *self);
    `;
  }
}
