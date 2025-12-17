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

export function buildDecoderDeclaration(): string {
  return [buildDeclarations().join("\n")].join("\n");
}

export function buildDecoderImplementation(): string {
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
    typedef struct DecoderContext {
      void (*error)(struct DecoderContext *ctx, const char *scope, const char *message);

      U32 (*tell)(struct DecoderContext *ctx);
      void (*seek)(struct DecoderContext *ctx, U32 offset);

      void *(*getId)(struct DecoderContext *ctx, ID id);
      void (*setId)(struct DecoderContext *ctx, ID id, U32 typeId, void *asset);

      void *(*allocate)(struct DecoderContext *ctx, U32 size, U32 count);
      void (*read)(struct DecoderContext *ctx, void *ptr, U32 size, U32 count);
    } DecoderContext;
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
    const backend = new DefinitionDecoderImplementation();

    backend.visit(definition);

    return backend.output;
  });
}

function buildDefinitionDeclarations(): string[] {
  return getNameSortedDefinitions().map((definition) => {
    const backend = new DefinitionDecoderDeclaration();

    backend.visit(definition);

    return backend.output;
  });
}

function buildSwitchDeclaration(): string {
  return cg`void decodeType(DecoderContext *ctx, U32 typeId, void **self);`;
}

function buildSwitchImplementation(): string {
  const cases: string[] = getIDSortedClasses()
    .map((cls) => {
      const backend = new SwitchDecoderImplementation();

      backend.visit(cls);

      return backend.output;
    })
    .filter((v) => v);

  return cg`
    void decodeType(DecoderContext *ctx, U32 typeId, void **self) {
      switch (typeId) {
        ${cases.join("\n")}
      }
    }
  `;
}

class DefinitionDecoderDeclaration extends EmptyEmit {
  protected emitObject(obj: any): string {
    const typeName = obj.constructor.name;

    return cg`void decode${typeName}(DecoderContext *ctx, ${typeName} *self);`;
  }

  protected emitClass(cls: Class, _fields: string): string {
    return this.emitObject(cls);
  }

  protected emitStruct(struct: Struct, _fields: string): string {
    return this.emitObject(struct);
  }

  protected emitAtom(atom: Atom): string {
    const typeName = atom.constructor.name;

    return cg`void decode${typeName}(DecoderContext *ctx, ${typeName} *self);`;
  }
}

class DefinitionDecoderImplementation extends CEmit {
  protected emitObject(obj: any, handler: string): string {
    const typeName = obj.constructor.name;

    return cg`
      void decode${typeName}(DecoderContext *ctx, ${typeName} *self) {
        ${handler}
      }
    `;
  }

  protected emitAtom(atom: Atom): string {
    const typeName = atom.constructor.name;

    return cg`
      void decode${typeName}(DecoderContext *ctx, ${typeName} *self) {
        ctx->read(ctx, self, sizeof(${typeName}), 1);
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
      decodeMetadataHeader(ctx, &self->metadata.header);
      U32 __version = self->metadata.header.version;
      U32 __end = self->metadata.header.end;
    `;
  }

  protected emitMetadataFooter(): string {
    return cg`
      decodeMetadataFooter(ctx, &self->metadata.footer);
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
        decode${this.getTypeName(type)}(ctx, &${target});
      `;
    }
  }

  protected emitWalkType(typeId: string, target: string): string {
    return cg`
      decodeType(ctx, ${typeId}, &${target});
    `;
  }

  protected emitAllocate<T>(
    target: string,
    type: ArrayType<T> | ListType<T>,
    count?: string
  ): string {
    return cg`${target} = ctx->allocate(ctx, sizeof(${this.getTypeName(type.type)}), ${count !== undefined ? count : (type as ListType<T>).maxCount});`;
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
    return cg`ctx->read(ctx, ${target}, sizeof(${this.getTypeName(type.type)}), ${count});`;
  }
}

class SwitchDecoderImplementation extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`
      case ${cls.__id}: *self = ctx->allocate(ctx, sizeof(${cls.constructor.name}), 1); decode${cls.constructor.name}(ctx, (${cls.constructor.name} *)*self); break;
    `;
  }
}
