import { CEmit } from "./emit";
import { EmptyEmit } from "@repo/core/backend";
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

export function buildFreeDeclaration(): string {
  return [buildDeclarations().join("\n")].join("\n");
}

export function buildFreeImplementation(): string {
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
    typedef struct FreeContext {
      void (*log)(struct FreeContext *ctx, const char *scope, const char *message);

      void (*free)(struct FreeContext *ctx, void *ptr);
    } FreeContext;
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
    const backend = new DefinitionFreeImplementation();

    backend.visit(definition);

    return backend.output;
  });
}

function buildDefinitionDeclarations(): string[] {
  return getNameSortedDefinitions().map((definition) => {
    const backend = new DefinitionFreeDeclaration();

    backend.visit(definition);

    return backend.output;
  });
}

function buildSwitchDeclaration(): string {
  return cg`void freeType(FreeContext *ctx, U32 typeId, void *self);`;
}

function buildSwitchImplementation(): string {
  return cg`
    void freeType(FreeContext *ctx, U32 typeId, void *self) {
      switch (typeId) {
        ${getIDSortedClasses()
          .map((cls) => {
            const backend = new SwitchFreeImplementation();

            backend.visit(cls);

            return backend.output;
          })
          .filter((v) => v)
          .join("\n")}
      }
    }
  `;
}

class DefinitionFreeDeclaration extends EmptyEmit {
  protected emitObject(obj: any): string {
    const typeName = obj.constructor.name;

    return cg`void free${typeName}(FreeContext *ctx, ${typeName} *self);`;
  }

  protected emitClass(cls: Class, _fields: string): string {
    return this.emitObject(cls);
  }

  protected emitStruct(struct: Struct, _fields: string): string {
    return this.emitObject(struct);
  }

  protected emitAtom(atom: Atom): string {
    const typeName = atom.constructor.name;

    return cg`void free${typeName}(FreeContext *ctx, ${typeName} *self);`;
  }
}

class DefinitionFreeImplementation extends CEmit {
  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return cg`
      void free${typeName}(FreeContext *ctx, ${typeName} *self) {
        ${handler}
      }
    `;
  }

  protected emitAtom(atom: Atom): string {
    const typeName = atom.constructor.name;

    return cg`
      void free${typeName}(FreeContext *ctx, ${typeName} *self) {}
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
      U32 __version = self->metadata.header.version;
    `;
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
        for (U32 ${v.__name} = 0; ${v.__name} < ${type.count}; ${v.__name}++) {
          ${this.emitWalk(type.type, this.emitIndex(target, v.__name))}
        }
      `;
    } else {
      return cg`
        free${this.getTypeName(type)}(ctx, &${target});
      `;
    }
  }

  protected emitWalkType(typeId: string, target: string): string {
    return cg`
      freeType(ctx, ${typeId}, ${target});
    `;
  }

  protected emitAllocate<T>(
    target: string,
    _type: ArrayType<T> | ListType<T>,
    _count?: string
  ): string {
    return cg`
      if (ctx->free) ctx->free(ctx, ${target});
      else free(${target});
    `;
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
    return "1";
  }

  protected emitLog(scope: string, message: string): string {
    return cg`if (ctx->log) ctx->log(ctx, "${scope}", "${message}");`;
  }
}

class SwitchFreeImplementation extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`
      case ${cls.__id}:
        free${cls.constructor.name}(ctx, (${cls.constructor.name} *)self);
        if (ctx->free) ctx->free(ctx, self);
        else free(self);
        break;
    `;
  }
}
