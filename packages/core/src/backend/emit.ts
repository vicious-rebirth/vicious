import {
  Atom,
  Class,
  Definition,
  Struct,
  CodeContext,
  FieldReference,
  Type,
  Value,
  VariableReference,
  PropertyReference,
  IndexReference,
  ArrayType,
  ListType,
  BaseType,
} from "../schema/core";
import { Backend } from "./core";

export abstract class Emit extends Backend {
  private scopes: string[][] = [[]];

  public get output(): string {
    if (this.scopes.length > 1) {
      debugger;
      throw "broken scopes";
    }

    return this.scopes[0]!.join("");
  }

  /**
   * Override
   */

  protected abstract emitClass(cls: Class, fields: string): string;

  protected abstract emitStruct(struct: Struct, fields: string): string;

  protected abstract emitAtom(atom: Atom): string;

  protected abstract emitStructField<T>(
    field: FieldReference,
    type?: ArrayType<T> | ListType<T> | BaseType<T>,
    handler?: string
  ): string;

  protected abstract emitMetadataHeader(): string;

  protected abstract emitMetadataFooter(): string;

  protected abstract emitArrayType(type: string, count: string): string;

  protected abstract emitListType(type: string, maxCount?: number): string;

  protected abstract emitType(type: string): string;

  protected abstract emitIf(
    condition: string,
    true_: string,
    false_?: string
  ): string;

  protected abstract emitFor(
    variable: string,
    size: string | undefined,
    body: string
  ): string;

  protected abstract emitBreak(): string;

  protected abstract emitFieldReference(field: FieldReference): string;

  protected abstract emitVariableReference(v: VariableReference): string;

  protected abstract emitVariableDefinition(
    v: VariableReference,
    type: string,
    data: string
  ): string;

  protected abstract emitLiteral(value: string): string;

  protected abstract emitIsTrue(value: string): string;
  protected abstract emitIsFalse(value: string): string;

  protected abstract emitDot(target: string, prop: string): string;

  protected abstract emitOperation(
    operator: string,
    left: string,
    right: string
  ): string;

  protected abstract emitVersion(): string;

  protected abstract emitEnd(): string;

  protected abstract emitIndex(target: string, index: string): string;

  protected abstract emitAssign(target: string, value: string): string;

  protected abstract emitAllocate<T>(
    target: string,
    type: ArrayType<T> | ListType<T>,
    count?: string
  ): string;

  protected abstract emitGrow<T>(
    target: string,
    type: ArrayType<T> | ListType<T>,
    index: string
  ): string;

  protected abstract emitForward<T>(
    target: string,
    type: ArrayType<T> | ListType<T>,
    count: string
  ): string;

  protected abstract emitSeek(offset: string): string;

  protected abstract emitTell(): string;

  protected abstract emitWalk<T>(
    type: ArrayType<T> | BaseType<T>,
    target: string
  ): string;

  protected abstract emitWalkType(typeId: string, target: string): string;

  protected abstract emitGetAssetFromMap(id: string): string;

  protected abstract emitSetAssetInMap(
    id: string,
    type: string,
    target: string
  ): string;

  protected abstract emitLog(scope: string, message: string): string;

  /**
   * Internal
   */

  protected enterClass(cls: Class): void {
    this.pushScope(cls);
  }

  protected exitClass(cls: Class): void {
    const [...fields] = this.popScope(cls);

    this.pushString(this.emitClass(cls, fields.filter((v) => v).join("\n")));
  }

  protected enterStruct(struct: Struct): void {
    this.pushScope(struct);
  }

  protected exitStruct(struct: Struct): void {
    const [...fields] = this.popScope(struct);

    this.pushString(
      this.emitStruct(struct, fields.filter((v) => v).join("\n"))
    );
  }

  protected exitAtom(atom: Atom): void {
    this.pushString(this.emitAtom(atom));
  }

  protected enterStructField(field: FieldReference): void {
    this.pushScope(field);
  }

  protected exitStructField(field: FieldReference): void {
    if (field.__props?.deprecated) {
      const [handler] = this.popScope(field);

      this.pushString(this.emitStructField(field, undefined, handler));
    } else {
      const [_type, handler] = this.popScope(field);

      this.pushString(
        this.emitStructField(
          field,
          field.__type ? this.getType(field.__type) : undefined,
          handler
        )
      );
    }
  }

  protected enterTypeDefinition(_type: Type | null | undefined): void {}

  protected exitTypeDefinition(_type: Type | null | undefined): void {}

  protected enterArrayType(
    _type: new (...args: any[]) => Definition,
    _count: number
  ): void {
    this.pushScope();
  }

  protected exitArrayType(
    _type: new (...args: any[]) => Definition,
    _count: number
  ): void {
    const [type, count] = this.popScope();

    this.pushString(this.emitArrayType(type!, count!));
  }

  protected enterListType(
    _type: new (...args: any[]) => Definition,
    _maxCount?: number
  ): void {
    this.pushScope();
  }

  protected exitListType(
    _type: new (...args: any[]) => Definition,
    maxCount?: number
  ): void {
    const [type] = this.popScope();

    this.pushString(this.emitListType(type!, maxCount));
  }

  protected exitType(type: new (...args: any[]) => Definition): void {
    this.pushString(this.emitType(type.name));
  }

  protected exitMetadataHeader(): void {
    this.pushString(this.emitMetadataHeader());
  }

  protected exitMetadataFooter(): void {
    this.pushString(this.emitMetadataFooter());
  }

  protected enterBlock(code: (ctx: CodeContext) => void): void {
    this.pushScope(code);
  }

  protected exitBlock(code: (ctx: CodeContext) => void): void {
    const [...lines] = this.popScope(code);

    this.pushString(lines.filter((v) => v).join("\n"));
  }

  protected enterCondition(code: (ctx: CodeContext) => void): void {
    this.pushScope(code);
  }

  protected exitCondition(code: (ctx: CodeContext) => void): void {
    const [value] = this.popScope(code);

    this.pushString(value!);
  }

  protected enterIf(
    _condition: (ctx: CodeContext) => void,
    _true: (ctx: CodeContext) => void,
    _false?: (ctx: CodeContext) => void
  ): void {
    this.pushScope();
  }

  protected exitIf(
    _condition: (ctx: CodeContext) => void,
    _true: (ctx: CodeContext) => void,
    _false?: (ctx: CodeContext) => void
  ): void {
    const [condition, true_, false_] = this.popScope();

    this.pushString(this.emitIf(condition!, true_!, false_));
  }

  protected enterFor(
    _v: VariableReference,
    _size: ((ctx: CodeContext) => void) | undefined,
    _body: (ctx: CodeContext) => void
  ): void {
    this.pushScope();
  }

  protected exitFor(
    v: VariableReference,
    size: ((ctx: CodeContext) => void) | undefined,
    _body: (ctx: CodeContext) => void
  ): void {
    if (size) {
      const [size, body] = this.popScope();

      this.pushString(this.emitFor(v.__name, size!, body!));
    } else {
      const [body] = this.popScope();

      this.pushString(this.emitFor(v.__name, undefined, body!));
    }
  }

  protected exitBreak(): void {
    this.pushString(this.emitBreak());
  }

  protected exitFieldReference(ref: FieldReference): void {
    this.pushString(this.emitFieldReference(ref));
  }

  protected enterPropertyReference(_ref: PropertyReference): void {
    this.pushScope();
  }

  protected exitPropertyReference(_ref: PropertyReference): void {
    const [target, name] = this.popScope();

    this.pushString(this.emitDot(target!, name!));
  }

  protected enterIndexReference(_ref: IndexReference): void {
    this.pushScope();
  }

  protected exitIndexReference(_ref: IndexReference): void {
    const [target, index] = this.popScope();

    this.pushString(this.emitIndex(target!, index!));
  }

  protected exitVariableReference(v: VariableReference): void {
    this.pushString(this.emitVariableReference(v));
  }

  protected exitLiteral(value: string): void {
    this.pushString(this.emitLiteral(value));
  }

  protected enterVariableDefinition(_v: VariableReference, _data: Value): void {
    this.pushScope();
  }

  protected exitVariableDefinition(v: VariableReference, _data: Value): void {
    const [type, data] = this.popScope();

    this.pushString(this.emitVariableDefinition(v, type!, data!));
  }

  protected enterIsTrue(_value: Value): void {
    this.pushScope();
  }

  protected exitIsTrue(_value: Value): void {
    const [value] = this.popScope();

    this.pushString(this.emitIsTrue(value!));
  }

  protected enterIsFalse(_value: Value): void {
    this.pushScope();
  }

  protected exitIsFalse(_value: Value): void {
    const [value] = this.popScope();

    this.pushString(this.emitIsFalse(value!));
  }

  protected enterOperation(
    operator: string,
    _left: Value,
    _right: Value
  ): void {
    this.pushScope(operator);
  }

  protected exitOperation(operator: string, _left: Value, _right: Value): void {
    const [left, right] = this.popScope(operator);

    this.pushString(this.emitOperation(operator, left!, right!));
  }

  protected exitVersion(): void {
    this.pushString(this.emitVersion());
  }

  protected exitEnd(): void {
    this.pushString(this.emitEnd());
  }

  protected enterIndex(_target: Value, _index: Value): void {
    this.pushScope();
  }

  protected exitIndex(_target: Value, _index: Value): void {
    const [target, index] = this.popScope();

    this.pushString(this.emitIndex(target!, index!));
  }

  protected enterAssign(_target: Value, _value: Value): void {
    this.pushScope();
  }

  protected exitAssign(_target: Value, _value: Value): void {
    const [target, value] = this.popScope();

    this.pushString(this.emitAssign(target!, value!));
  }

  protected enterAllocate(_target: Value, _count?: Value): void {
    this.pushScope();
  }

  protected exitAllocate(target: Value, _count?: Value): void {
    const [target_, count_] = this.popScope();

    this.pushString(
      this.emitAllocate(target_!, this.getType(target) as any, count_)
    );
  }

  protected enterGrow(_target: Value, _index: Value): void {
    this.pushScope();
  }

  protected exitGrow(target: Value, _index: Value): void {
    const [target_, index_] = this.popScope();

    this.pushString(
      this.emitGrow(target_!, this.getType(target) as any, index_!)
    );
  }

  protected enterForward(_target: Value, _count: Value): void {
    this.pushScope();
  }

  protected exitForward(target: Value, _count: Value): void {
    const [target_, count] = this.popScope();

    this.pushString(
      this.emitForward(target_!, this.getType(target) as any, count!)
    );
  }

  protected exitSeek(_offset: Value): void {
    const [offset] = this.popScope();

    this.pushString(this.emitSeek(offset!));
  }

  protected enterSeek(_offset: Value): void {
    this.pushScope();
  }

  protected exitTell(): void {
    this.pushString(this.emitTell());
  }

  protected enterWalk(_target: Value): void {
    this.pushScope();
  }

  protected exitWalk(target: Value): void {
    const [target_] = this.popScope();

    this.pushString(this.emitWalk(this.getType(target) as any, target_!));
  }

  protected enterWalkType(_typeId: Value, _target: Value): void {
    this.pushScope();
  }

  protected exitWalkType(_typeId: Value, _target: Value): void {
    const [typeId, target] = this.popScope();

    this.pushString(this.emitWalkType(typeId!, target!));
  }

  protected enterGetAssetFromMap(_id: Value): void {
    this.pushScope();
  }

  protected exitGetAssetFromMap(_id: Value): void {
    const [id] = this.popScope();

    this.pushString(this.emitGetAssetFromMap(id!));
  }

  protected enterSetAssetInMap(_id: Value, _type: Value, _target: Value): void {
    this.pushScope();
  }

  protected exitSetAssetInMap(_id: Value, _type: Value, _target: Value): void {
    const [id, type, target] = this.popScope();

    this.pushString(this.emitSetAssetInMap(id!, type!, target!));
  }

  protected exitLog(scope: string, message: string): void {
    this.pushString(this.emitLog(scope, message));
  }

  protected pushString(str: string): void {
    this.scopes[this.scopes.length - 1]!.push(str);
  }

  protected pushScope(obj?: any): void {
    this.scopes.push([]);
  }

  protected popScope(obj?: any): string[] {
    return this.scopes.pop()!;
  }

  protected getType<T = any>(
    target: any
  ): ArrayType<T> | ListType<T> | BaseType<T> {
    if (target instanceof FieldReference) {
      return this.getType(target.__type!);
    } else if (target instanceof VariableReference) {
      return this.getType(target.__type);
    } else if (target instanceof ArrayType) {
      return target;
    } else if (target instanceof ListType) {
      return target;
    }

    if (target instanceof PropertyReference) {
      const out = this.getType(target.__parent);

      return this.getType(new (out as any)()[target.__prop]);
    } else if (target instanceof IndexReference) {
      const out = this.getType(target.__parent);

      return this.getType((out as any).type);
    }

    if (typeof target !== "function") {
      debugger;
      throw `invalid target: ${target}`;
    }

    const isClass = Function.prototype.toString
      .call(target)
      .startsWith("class ");
    if (!isClass) {
      const out = (target as any)({
        array: (type: any, count: number) => new ArrayType(type, count),
        list: (type: any, maxCount?: number) => new ListType(type, maxCount),
        index: (target: any, value: any) => new IndexReference(target, value),
      });

      if (out instanceof ArrayType || out instanceof ListType) {
        return out;
      }

      return this.getType(out);
    }

    return target as any;
  }

  protected getTypeName<T>(type: BaseType<T>): string {
    return type.name;
  }
}

export class EmptyEmit extends Emit {
  protected emitClass(_cls: Class, _fields: string): string {
    return "";
  }

  protected emitStruct(_struct: Struct, _fields: string): string {
    return "";
  }

  protected emitAtom(_atom: Atom): string {
    return "";
  }

  protected emitStructField<T>(
    _field: FieldReference,
    _type?: ArrayType<T> | ListType<T> | BaseType<T>,
    _handler?: string
  ): string {
    return "";
  }

  protected emitMetadataHeader(): string {
    return "";
  }

  protected emitMetadataFooter(): string {
    return "";
  }

  protected emitArrayType(_type: string, _count: string): string {
    return "";
  }

  protected emitListType(_type: string, _maxCount?: number): string {
    return "";
  }

  protected emitType(_type: string): string {
    return "";
  }

  protected emitIf(_condition: string, _true: string, _false?: string): string {
    return "";
  }

  protected emitFor(_variable: string, _size: string, _body: string): string {
    return "";
  }

  protected emitBreak(): string {
    return "";
  }

  protected emitFieldReference(_field: FieldReference): string {
    return "";
  }

  protected emitVariableReference(_v: VariableReference): string {
    return "";
  }

  protected emitVariableDefinition(
    _v: VariableReference,
    _type: string,
    _data: string
  ): string {
    return "";
  }

  protected emitLiteral(_value: string): string {
    return "";
  }

  protected emitIsTrue(_value: string): string {
    return "";
  }

  protected emitIsFalse(_value: string): string {
    return "";
  }

  protected emitDot(_target: string, _prop: string): string {
    return "";
  }

  protected emitOperation(
    _operator: string,
    _left: string,
    _right: string
  ): string {
    return "";
  }

  protected emitVersion(): string {
    return "";
  }

  protected emitEnd(): string {
    return "";
  }

  protected emitIndex(_target: string, _index: string): string {
    return "";
  }

  protected emitAssign(_target: string, _value: string): string {
    return "";
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

  protected emitForward<T>(
    _target: string,
    _type: ArrayType<T> | ListType<T>,
    _count: string
  ): string {
    return "";
  }

  protected emitSeek(_offset: string): string {
    return "";
  }

  protected emitTell(): string {
    return "";
  }

  protected emitWalk<T>(
    _type: ArrayType<T> | ListType<T> | BaseType<T>,
    _target: string
  ): string {
    return "";
  }

  protected emitWalkType(_typeId: string, _target: string): string {
    return "";
  }

  protected emitGetAssetFromMap(_id: string): string {
    return "";
  }

  protected emitSetAssetInMap(_id: string, _target: string): string {
    return "";
  }

  protected emitLog(_scope: string, _message: string): string {
    return "";
  }
}
