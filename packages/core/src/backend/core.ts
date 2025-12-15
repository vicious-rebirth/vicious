import { U32 } from "../schema/types/atomic";
import {
  FieldReference,
  Definition,
  Struct,
  Class,
  Type,
  TypeContext,
  Atom,
  CodeContext,
  Value,
  VariableReference,
  PropertyReference,
  IndexReference,
} from "../schema/core";

export abstract class Backend {
  public readonly context = this.buildContext();

  protected currentField: FieldReference | null = null;
  protected currentIterator: VariableReference | null = null;
  protected variableCount: number = 0;

  public visit(obj: Definition): void {
    if (obj instanceof Atom) {
      this.visitAtom(obj);
    } else if (obj instanceof Struct) {
      this.visitStruct(obj);
    } else if (obj instanceof Class) {
      this.visitClass(obj);
    }
  }

  /**
   * Override
   */

  protected abstract enterClass(cls: Class): void;
  protected abstract exitClass(cls: Class): void;

  protected abstract enterStruct(struct: Struct): void;
  protected abstract exitStruct(struct: Struct): void;

  protected abstract exitAtom(atom: Atom): void;

  protected abstract exitMetadataHeader(): void;

  protected abstract exitMetadataFooter(): void;

  protected abstract enterStructField(field: FieldReference): void;
  protected abstract exitStructField(field: FieldReference): void;

  protected abstract enterTypeDefinition(type: Type | null | undefined): void;
  protected abstract exitTypeDefinition(type: Type | null | undefined): void;

  protected abstract exitType(type: new (...args: any[]) => Definition): void;

  protected abstract enterArrayType(
    type: new (...args: any[]) => Definition,
    count: number
  ): void;
  protected abstract exitArrayType(
    type: new (...args: any[]) => Definition,
    count: number
  ): void;

  protected abstract enterListType(
    type: new (...args: any[]) => Definition,
    maxCount?: number
  ): void;
  protected abstract exitListType(
    type: new (...args: any[]) => Definition,
    maxCount?: number
  ): void;

  protected abstract enterBlock(code: (ctx: CodeContext) => void): void;
  protected abstract exitBlock(code: (ctx: CodeContext) => void): void;

  protected abstract enterIf(
    condition: (ctx: CodeContext) => void,
    true_: (ctx: CodeContext) => void,
    false_?: (ctx: CodeContext) => void
  ): void;
  protected abstract exitIf(
    condition: (ctx: CodeContext) => void,
    true_: (ctx: CodeContext) => void,
    false_?: (ctx: CodeContext) => void
  ): void;

  protected abstract enterFor(
    v: VariableReference,
    size: Definition | number | undefined | ((ctx: CodeContext) => void),
    body: (ctx: CodeContext) => void
  ): void;
  protected abstract exitFor(
    v: VariableReference,
    size: Definition | number | undefined | ((ctx: CodeContext) => void),
    body: (ctx: CodeContext) => void
  ): void;

  protected abstract exitBreak(): void;

  protected abstract exitFieldReference(field: FieldReference): void;

  protected abstract exitVariableReference(v: VariableReference): void;

  protected abstract enterPropertyReference(prop: PropertyReference): void;
  protected abstract exitPropertyReference(prop: PropertyReference): void;

  protected abstract enterIndexReference(prop: IndexReference): void;
  protected abstract exitIndexReference(prop: IndexReference): void;

  protected abstract exitLiteral(value: string): void;

  protected abstract enterVariableDefinition(
    v: VariableReference,
    data: Value
  ): void;
  protected abstract exitVariableDefinition(
    v: VariableReference,
    data: Value
  ): void;

  protected abstract enterIsTrue(value: Value): void;
  protected abstract exitIsTrue(value: Value): void;

  protected abstract enterIsFalse(value: Value): void;
  protected abstract exitIsFalse(value: Value): void;

  protected abstract enterOperation(
    operator: string,
    left: Value,
    right: Value
  ): void;
  protected abstract exitOperation(
    operator: string,
    left: Value,
    right: Value
  ): void;

  protected abstract exitVersion(): void;

  protected abstract exitEnd(): void;

  protected abstract enterIndex(target: Value, index: Value): void;
  protected abstract exitIndex(target: Value, index: Value): void;

  protected abstract enterAssign(target: Value, value: Value): void;
  protected abstract exitAssign(target: Value, value: Value): void;

  protected abstract enterAllocate(target: Value, count: Value): void;
  protected abstract exitAllocate(target: Value, count: Value): void;

  protected abstract enterForward(target: Value, count: Value): void;
  protected abstract exitForward(target: Value, count: Value): void;

  protected abstract enterSeek(offset: Value): void;
  protected abstract exitSeek(offset: Value): void;

  protected abstract exitTell(): void;

  protected abstract enterWalk(target: Value): void;
  protected abstract exitWalk(target: Value): void;

  protected abstract enterWalkType(typeId: Value, target: Value): void;
  protected abstract exitWalkType(typeId: Value, target: Value): void;

  protected abstract enterGetAssetFromMap(id: Value): void;
  protected abstract exitGetAssetFromMap(id: Value): void;

  protected abstract enterSetAssetInMap(id: Value, target: Value): void;
  protected abstract exitSetAssetInMap(id: Value, target: Value): void;

  protected abstract exitError(scope: string, message: string): void;

  /**
   * Internal
   */

  protected visitClass(cls: Class): void {
    this.variableCount = 0;

    this.enterClass(cls);

    if (cls.__metadata) {
      this.visitMetadataHeader();
    }

    this.visitStructFields(cls);

    if (cls.__metadata) {
      this.visitMetadataFooter();
    }

    this.exitClass(cls);
  }

  protected visitStruct(struct: Struct): void {
    this.variableCount = 0;

    this.enterStruct(struct);

    if (struct.__metadata) {
      this.visitMetadataHeader();
    }

    this.visitStructFields(struct);

    if (struct.__metadata) {
      this.visitMetadataFooter();
    }

    this.exitStruct(struct);
  }

  protected visitAtom(atom: Atom): void {
    this.variableCount = 0;

    this.exitAtom(atom);
  }

  protected visitMetadataHeader(): void {
    this.exitMetadataHeader();
  }

  protected visitMetadataFooter(): void {
    this.exitMetadataFooter();
  }

  protected visitStructFields(obj: any): void {
    for (const name of Object.getOwnPropertyNames(obj)) {
      const field = obj[name];

      if (field instanceof FieldReference) {
        field.__name = name;
        this.visitStructField(field);
      }
    }
  }

  protected visitStructField(field: FieldReference): void {
    this.currentField = field;

    this.enterStructField(field);

    this.visitTypeDefinition(field.__type);

    if (field.__props?.deprecated) {
      const condition = field.__props?.deprecated;

      this.visitBlock((ctx) => {
        ctx.if(
          (ctx) => condition(ctx),
          (ctx) => ctx.todo("deprecated")
        );
      });
    } else if (field.__props?.skip) {
      // Skip
    } else if (field.__props?.custom) {
      const custom = field.__props?.custom;
      this.visitBlock((ctx) => {
        const condition = field.__props?.condition;
        if (condition) {
          ctx.if(
            (ctx) => condition(ctx),
            (ctx) => custom(ctx)
          );
        } else {
          custom(ctx);
        }
      });
    } else {
      this.visitBlock((ctx) => {
        const condition = field.__props?.condition;
        if (condition) {
          ctx.if(
            (ctx) => condition(ctx),
            (ctx) => ctx.walk()
          );
        } else {
          ctx.walk();
        }
      });
    }

    this.exitStructField(field);
  }

  protected visitTypeDefinition(type: Type | null | undefined): void {
    this.enterTypeDefinition(type);

    if (type) {
      const isClass = Function.prototype.toString
        .call(type)
        .startsWith("class ");
      if (isClass) this.visitType(type as any);
      else (type as any)(this.context);
    }

    this.exitTypeDefinition(type);
  }

  protected visitType(type: new (...args: any[]) => Definition): any {
    this.exitType(type);

    return type;
  }

  public visitArrayType(
    type: new (...args: any[]) => Definition,
    count: number
  ): any {
    this.enterArrayType(type, count);

    const out = this.visitType(type);

    this.exitArrayType(type, count);

    return out;
  }

  protected visitListType(
    type: new (...args: any[]) => Definition,
    maxCount?: number
  ): any {
    this.enterListType(type, maxCount);

    const out = this.visitType(type);

    this.exitListType(type, maxCount);

    return out;
  }

  protected visitCode(code: (ctx: CodeContext) => void): void {
    code(this.context);
  }

  protected visitReference(value: any): any {
    if (typeof value === "function") {
      value = value(this.context);
    }

    if (value instanceof FieldReference) {
      return this.visitFieldReference(value);
    } else if (value instanceof VariableReference) {
      return this.visitVariableReference(value);
    } else if (value instanceof PropertyReference) {
      return this.visitPropertyReference(value);
    } else if (value instanceof IndexReference) {
      return this.visitIndexReference(value);
    }

    debugger;
    throw `unhandled reference ${value}`;
  }

  protected isReference(value: any): boolean {
    return (
      value instanceof FieldReference ||
      value instanceof IndexReference ||
      value instanceof PropertyReference ||
      value instanceof VariableReference
    );
  }

  protected visitValue(value: Value): any {
    if (typeof value === "number" || typeof value === "boolean") {
      return this.visitLiteral(value.toString());
    } else if (typeof value === "string") {
      return this.visitLiteral(value);
    } else if (typeof value === "function") {
      const out = value(this.context);

      if (this.isReference(out)) {
        return this.visitReference(out);
      } else {
        return out;
      }
    } else if (this.isReference(value)) {
      return this.visitReference(value);
    } else {
      debugger;
      throw `unhandled value ${value}`;
    }
  }

  protected visitLiteral(value: string): void {
    this.exitLiteral(value);
  }

  protected visitFieldReference(ref: FieldReference): FieldReference {
    this.exitFieldReference(ref);

    return ref;
  }

  protected visitVariableReference(ref: VariableReference): VariableReference {
    this.exitVariableReference(ref);

    return ref;
  }

  protected visitPropertyReference(ref: PropertyReference): PropertyReference {
    this.enterPropertyReference(ref);

    this.visitReference(ref.__parent);
    this.visitLiteral(String(ref.__prop));

    this.exitPropertyReference(ref);

    return ref;
  }

  protected visitIndexReference(ref: IndexReference): IndexReference {
    this.enterIndexReference(ref);

    this.visitReference(ref.__parent);
    this.visitValue(ref.__index);

    this.exitIndexReference(ref);

    return ref;
  }

  protected visitBlock(code: (ctx: CodeContext) => void): void {
    this.enterBlock(code);

    this.visitCode(code);

    this.exitBlock(code);
  }

  protected visitIf(
    condition: (ctx: CodeContext) => void,
    true_: (ctx: CodeContext) => void,
    false_?: (ctx: CodeContext) => void
  ): void {
    this.enterIf(condition, true_, false_);

    this.visitBlock(condition);
    this.visitBlock(true_);
    if (false_) this.visitBlock(false_);

    this.exitIf(condition, true_, false_);
  }

  protected visitFor(
    size: Definition | number | undefined | ((ctx: CodeContext) => void),
    body: (ctx: CodeContext) => void
  ): void {
    const v = this.newVariable(U32);
    this.currentIterator = v;

    this.enterFor(v, size, body);

    if (size !== undefined) this.visitValue(size);
    this.visitBlock(body);

    this.exitFor(v, size, body);
  }

  protected visitIterator(): void {
    return this.visitReference(this.currentIterator);
  }

  protected visitBreak(): void {
    this.exitBreak();
  }

  protected visitVariableDefinition(
    type: Type,
    data: Value
  ): VariableReference {
    const v = this.newVariable(type);

    this.enterVariableDefinition(v, data);

    this.visitTypeDefinition(type);
    this.visitValue(data);

    this.exitVariableDefinition(v, data);

    return v;
  }

  protected visitIsTrue(value: Value): void {
    this.enterIsTrue(value);

    this.visitValue(value);

    this.exitIsTrue(value);
  }

  protected visitIsFalse(value: Value): void {
    this.enterIsFalse(value);

    this.visitValue(value);

    this.exitIsFalse(value);
  }

  protected visitOperation(operator: string, left: Value, right: Value): void {
    this.enterOperation(operator, left, right);

    this.visitValue(left);
    this.visitValue(right);

    this.exitOperation(operator, left, right);
  }

  protected visitVersion(): void {
    this.exitVersion();
  }

  protected visitEnd(): void {
    this.exitEnd();
  }

  protected visitIndex(target: Value, index: Value): any {
    return new IndexReference(target, index);
  }

  protected visitAssign(target: Value, value: Value): void {
    this.enterAssign(target, value);

    const out = this.visitValue(target);
    this.visitValue(value);

    this.exitAssign(target, value);

    return out;
  }

  protected visitAllocate(target: Value, count: Value): void {
    this.enterAllocate(target, count);

    this.visitValue(target);
    this.visitValue(count);

    this.exitAllocate(target, count);
  }

  protected visitForward(target: Value, count: Value): void {
    this.enterForward(target, count);

    this.visitValue(target);
    this.visitValue(count);

    this.exitForward(target, count);
  }

  protected visitSeek(offset: Value): void {
    this.enterSeek(offset);

    this.visitValue(offset);

    this.exitSeek(offset);
  }

  protected visitTell(): void {
    this.exitTell();
  }

  protected visitWalk(target?: Value): void {
    const target_ = target || (this.currentField as any);

    this.enterWalk(target_);

    this.visitReference(target_);

    this.exitWalk(target_);
  }

  protected visitWalkType(typeId: Value, target?: Value): void {
    const target_ = target || (this.currentField as any);

    this.enterWalkType(typeId, target_);

    this.visitValue(typeId);
    this.visitValue(target_);

    this.exitWalkType(typeId, target_);
  }

  protected visitGetAssetFromMap(id: Value): void {
    this.enterGetAssetFromMap(id);

    this.visitValue(id);

    this.exitGetAssetFromMap(id);
  }

  protected visitSetAssetInMap(id: Value, target: Value): void {
    this.enterSetAssetInMap(id, target);

    this.visitValue(id);
    this.visitValue(target);

    this.exitSetAssetInMap(id, target);
  }

  protected visitError(scope: string, message: string): void {
    this.exitError(scope, message);
  }

  protected newVariable(type: Type): VariableReference {
    return new VariableReference(`t${this.variableCount++}`, type);
  }

  protected buildContext(): TypeContext & CodeContext {
    return {
      array: (type, count) => this.visitArrayType(type, count) as any,
      list: (type, maxCount) => this.visitListType(type, maxCount) as any,

      if: (
        condition: (ctx: CodeContext) => void,
        true_: (ctx: CodeContext) => void,
        false_?: (ctx: CodeContext) => void
      ) => this.visitIf(condition, true_, false_) as any,

      for: (
        size: Definition | number | ((ctx: CodeContext) => void),
        body: (ctx: CodeContext) => void
      ) => this.visitFor(size, body) as any,

      loop: (body: (ctx: CodeContext) => void) =>
        this.visitFor(undefined, body) as any,

      iterator: () => this.visitIterator() as any,

      break: () => this.visitBreak() as any,

      var: (type: Type, data: Value) =>
        this.visitVariableDefinition(type, data) as any,

      isTrue: (value: Value) => this.visitIsTrue(value) as any,
      isFalse: (value: Value) => this.visitIsFalse(value) as any,

      add: (left: Value, right: Value) =>
        this.visitOperation("+", left, right) as any,
      sub: (left: Value, right: Value) =>
        this.visitOperation("-", left, right) as any,
      mul: (left: Value, right: Value) =>
        this.visitOperation("*", left, right) as any,
      div: (left: Value, right: Value) =>
        this.visitOperation("/", left, right) as any,
      shl: (left: Value, right: Value) =>
        this.visitOperation("<<", left, right) as any,
      shr: (left: Value, right: Value) =>
        this.visitOperation(">>", left, right) as any,
      band: (left: Value, right: Value) =>
        this.visitOperation("&", left, right) as any,
      bor: (left: Value, right: Value) =>
        this.visitOperation("|", left, right) as any,
      xor: (left: Value, right: Value) =>
        this.visitOperation("^", left, right) as any,
      eq: (left: Value, right: Value) =>
        this.visitOperation("==", left, right) as any,
      neq: (left: Value, right: Value) =>
        this.visitOperation("!=", left, right) as any,
      lt: (left: Value, right: Value) =>
        this.visitOperation("<", left, right) as any,
      lte: (left: Value, right: Value) =>
        this.visitOperation("<=", left, right) as any,
      gt: (left: Value, right: Value) =>
        this.visitOperation(">", left, right) as any,
      gte: (left: Value, right: Value) =>
        this.visitOperation(">=", left, right) as any,
      and: (left: Value, right: Value) =>
        this.visitOperation("&&", left, right) as any,
      or: (left: Value, right: Value) =>
        this.visitOperation("||", left, right) as any,

      version: () => this.visitVersion() as any,
      end: () => this.visitEnd() as any,

      index: (target: Value[], value: Value) =>
        this.visitIndex(target as any, value) as any,

      set: (target: Value, value: Value) =>
        this.visitAssign(target, value) as any,
      allocate: <T extends Definition | number | string>(
        target: T[],
        count: Value
      ) => this.visitAllocate(target as any, count) as any,
      forward: <T extends Definition | number | string>(
        target: T[],
        count: Value
      ) => this.visitForward(target as any, count),

      seek: (offset: Value) => this.visitSeek(offset),
      tell: () => this.visitTell(),

      walk: (target?: Value) => this.visitWalk(target) as any,
      walkId: (id: Value, target?: Value) =>
        this.visitWalkType(id, target) as any,

      getId: (id: Value) => this.visitGetAssetFromMap(id) as any,
      setId: (id: Value, target: Value) =>
        this.visitSetAssetInMap(id, target) as any,

      error: (message: string) => this.visitError("ERROR", message),
      todo: (message: string) => this.visitError("TODO", message),
    };
  }
}
