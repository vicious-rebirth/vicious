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

export function buildEncoderDeclaration(): string {
  return [buildDeclarations().join("\n")].join("\n");
}

export function buildEncoderImplementation(): string {
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
    typedef struct EncoderContext {
      void (*error)(struct EncoderContext *ctx, const char *scope, const char *message);

      U32 (*tell)(struct EncoderContext *ctx);
      void (*seek)(struct EncoderContext *ctx, U32 offset);

      void *(*getId)(struct EncoderContext *ctx, ID id);

      void (*write)(struct EncoderContext *ctx, const void *ptr, U32 size, U32 count);
    } EncoderContext;
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
    const backend = new DefinitionEncoderImplementation();

    backend.visit(definition);

    return backend.output;
  });
}

function buildDefinitionDeclarations(): string[] {
  return getNameSortedDefinitions().map((definition) => {
    const backend = new DefinitionEncoderDeclaration();

    backend.visit(definition);

    return backend.output;
  });
}

function buildSwitchDeclaration(): string {
  return cg`void encodeType(EncoderContext *ctx, U32 typeId, const void *self);`;
}

function buildSwitchImplementation(): string {
  const cases: string[] = getIDSortedClasses()
    .map((cls) => {
      const backend = new SwitchEncoderImplementation();

      backend.visit(cls);

      return backend.output;
    })
    .filter((v) => v);

  return cg`
    void encodeType(EncoderContext *ctx, U32 typeId, const void *self) {
      switch (typeId) {
        ${cases.join("\n")}
      }
    }
  `;
}

class DefinitionEncoderDeclaration extends EmptyEmit {
  protected emitObject(obj: any): string {
    const typeName = obj.constructor.name;

    return cg`void encode${typeName}(EncoderContext *ctx, const ${typeName} *self);`;
  }

  protected emitClass(cls: Class, _fields: string): string {
    return this.emitObject(cls);
  }

  protected emitStruct(struct: Struct, _fields: string): string {
    return this.emitObject(struct);
  }

  protected emitAtom(atom: Atom): string {
    const typeName = atom.constructor.name;

    return cg`void encode${typeName}(EncoderContext *ctx, const ${typeName} *self);`;
  }
}

class DefinitionEncoderImplementation extends CEmit {
  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return cg`
      void encode${typeName}(EncoderContext *ctx, const ${typeName} *self) {
        ${handler}
      }
    `;
  }

  protected emitAtom(atom: Atom): string {
    const typeName = atom.constructor.name;

    return cg`
      void encode${typeName}(EncoderContext *ctx, const ${typeName} *self) {
        ctx->write(ctx, self, sizeof(${typeName}), 1);
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
      encodeMetadataHeader(ctx, &self->metadata.header);
      U32 __start = ctx->tell(ctx) - 12;
      U32 __version = self->metadata.header.version;
    `;
  }

  protected emitMetadataFooter(): string {
    return cg`
      encodeMetadataFooter(ctx, &self->metadata.footer);
      U32 __ptr = ctx->tell(ctx);
      ctx->seek(ctx, __start + 4);
      U32 __footer = __ptr - 4;
      encodeU32(ctx, &__footer);
      ctx->seek(ctx, __ptr);
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
        encode${this.getTypeName(type)}(ctx, &${target});
      `;
    }
  }

  protected emitWalkType(typeId: string, target: string): string {
    return cg`
      encodeType(ctx, ${typeId}, ${target});
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
    target: string,
    type: ArrayType<T> | ListType<T>,
    count: string
  ): string {
    return cg`ctx->write(ctx, ${target}, sizeof(${this.getTypeName(type.type)}), ${count});`;
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

  protected emitEnd(): string {
    return "0";
  }
}

class SwitchEncoderImplementation extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`
      case ${cls.__id}: encode${cls.constructor.name}(ctx, (${cls.constructor.name} *)self); break;
    `;
  }
}
