import {
  AtomicCodec,
  ClassCodec,
  Codec,
  CodeContext,
  FieldReference,
  MetadataCodec,
  Type,
  Value,
  VariableReference,
} from "../../schema/core";
import { Backend } from "../core";

export class CodecBackend extends Backend {
  private scopes: string[][] = [[]];

  public constructor(public readonly isDecoder: boolean) {
    super();
  }

  public getOutput(): string {
    return this.scopes[0].join("");
  }

  /**
   * Override
   */

  protected emitClass(cls: ClassCodec, fields: string): string {
    return "";
  }

  protected emitMetadataStruct(struct: MetadataCodec, fields: string): string {
    return "";
  }

  protected emitStruct(struct: Codec, fields: string): string {
    return "";
  }

  protected emitAtomic(atom: AtomicCodec): string {
    return "";
  }

  protected emitStructField(
    field: FieldReference,
    type: string,
    handler?: string
  ): string {
    return "";
  }

  protected emitArrayType(type: string, count: string): string {
    return "";
  }

  protected emitListType(type: string, maxCount?: number): string {
    return "";
  }

  protected emitType(type: string): string {
    return "";
  }

  protected emitIf(condition: string, true_: string, false_?: string): string {
    return "";
  }

  protected emitFor(variable: string, size: string, body: string): string {
    return "";
  }

  protected emitBreak(): string {
    return "";
  }

  protected emitFieldReference(field: FieldReference): string {
    return "";
  }

  protected emitVariableReference(v: VariableReference): string {
    return "";
  }

  protected emitVariableDefinition(
    v: VariableReference,
    type: string,
    data: string
  ): string {
    return "";
  }

  protected emitLiteral(value: string): string {
    return "";
  }

  protected emitNot(value: string): string {
    return "";
  }

  protected emitOperation(
    operator: string,
    left: string,
    right: string
  ): string {
    return "";
  }

  protected emitVersion(): string {
    return "";
  }

  protected emitEnd(): string {
    return "";
  }

  protected emitIndex(target: string, index: string): string {
    return "";
  }

  protected emitAssign(target: string, value: string): string {
    return "";
  }

  protected emitAllocate(target: string, type: string, count: string): string {
    return "";
  }

  protected emitForward(target: string, type: string, count: string): string {
    return "";
  }

  protected emitSeek(offset: string): string {
    return "";
  }

  protected emitTell(): string {
    return "";
  }

  protected emitWalk(type: string, target: string): string {
    return "";
  }

  protected emitWalkType(typeId: string, target: string): string {
    return "";
  }

  protected emitGetAssetFromMap(id: string): string {
    return "";
  }

  protected emitSetAssetInMap(id: string, target: string): string {
    return "";
  }

  protected emitError(scope: string, message: string): string {
    return "";
  }

  /**
   * Internal
   */

  protected enterClass(cls: ClassCodec): void {
    this.pushScope(cls);
  }

  protected exitClass(cls: ClassCodec): void {
    const [...fields] = this.popScope(cls);

    this.pushString(this.emitClass(cls, fields.join("\n")));
  }

  protected enterMetadataStruct(struct: MetadataCodec): void {
    this.pushScope(struct);
  }

  protected exitMetadataStruct(struct: MetadataCodec): void {
    const [...fields] = this.popScope(struct);

    this.pushString(this.emitMetadataStruct(struct, fields.join("\n")));
  }

  protected enterStruct(struct: Codec): void {
    this.pushScope(struct);
  }

  protected exitStruct(struct: Codec): void {
    const [...fields] = this.popScope(struct);

    this.pushString(this.emitStruct(struct, fields.join("\n")));
  }

  protected exitAtomic(atom: AtomicCodec): void {
    this.pushString(this.emitAtomic(atom));
  }

  protected enterStructField(field: FieldReference): void {
    this.pushScope(field);
  }

  protected exitStructField(field: FieldReference): void {
    const out = this.popScope(field);

    if (field.props?.skip) {
      const [type] = out;

      this.pushString(this.emitStructField(field, type));
    } else {
      const [type, handler] = out;

      this.pushString(this.emitStructField(field, type, handler));
    }
  }

  protected enterArrayType(
    _type: new (...args: any[]) => Codec,
    _count: number
  ): void {
    this.pushScope();
  }

  protected exitArrayType(
    _type: new (...args: any[]) => Codec,
    _count: number
  ): void {
    const [type, count] = this.popScope();

    this.pushString(this.emitArrayType(type, count));
  }

  protected enterListType(
    _type: new (...args: any[]) => Codec,
    _maxCount?: number
  ): void {
    this.pushScope();
  }

  protected exitListType(
    _type: new (...args: any[]) => Codec,
    maxCount?: number
  ): void {
    const [type] = this.popScope();

    this.pushString(this.emitListType(type, maxCount));
  }

  protected exitType(type: new (...args: any[]) => Codec): void {
    this.pushString(this.emitType(type.name));
  }

  protected enterBlock(code: (ctx: CodeContext) => void): void {
    this.pushScope(code);
  }

  protected exitBlock(code: (ctx: CodeContext) => void): void {
    const [...lines] = this.popScope(code);

    this.pushString(lines.join("\n"));
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

    this.pushString(this.emitIf(condition, true_, false_));
  }

  protected enterFor(
    v: VariableReference,
    _size: (ctx: CodeContext) => void,
    _body: (ctx: CodeContext) => void
  ): void {
    this.pushScope();
  }

  protected exitFor(
    v: VariableReference,
    _size: (ctx: CodeContext) => void,
    _body: (ctx: CodeContext) => void
  ): void {
    const [size, body] = this.popScope();

    this.pushString(this.emitFor("", size, body));
  }

  protected exitBreak(): void {
    this.pushString(this.emitBreak());
  }

  protected exitFieldReference(field: FieldReference): void {
    this.pushString(this.emitFieldReference(field));
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

    this.pushString(this.emitVariableDefinition(v, type, data));
  }

  protected enterNot(_value: Value): void {
    this.pushScope();
  }

  protected exitNot(_value: Value): void {
    const [value] = this.popScope();

    this.pushString(this.emitNot(value));
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

    this.pushString(this.emitOperation(operator, left, right));
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

    this.pushString(this.emitIndex(target, index));
  }

  protected enterAssign(_target: Value, _value: Value): void {
    this.pushScope();
  }

  protected exitAssign(_target: Value, _value: Value): void {
    const [target, value] = this.popScope();

    this.pushString(this.emitAssign(target, value));
  }

  protected enterAllocate(_target: Value, _count: Value): void {
    this.pushScope();
  }

  protected exitAllocate(_target: Value, _count: Value): void {
    const [target, count] = this.popScope();

    this.pushString(
      this.emitAllocate(target, this.getTypeName(this.currentReference), count)
    );
  }

  protected enterForward(_target: Value, _count: Value): void {
    this.pushScope();
  }

  protected exitForward(_target: Value, _count: Value): void {
    const [target, count] = this.popScope();

    this.pushString(
      this.emitForward(target, this.getTypeName(this.currentReference), count)
    );
  }

  protected exitSeek(_offset: Value): void {
    const [offset] = this.popScope();

    this.pushString(this.emitSeek(offset));
  }

  protected enterSeek(_offset: Value): void {
    this.pushScope();
  }

  protected exitTell(): void {
    this.pushString(this.emitTell());
  }

  protected exitWalk(_target: Value): void {
    const [target] = this.popScope();

    this.pushString(
      this.emitWalk(this.getTypeName(this.currentReference?.type), target)
    );
  }

  protected enterWalk(_target: Value): void {
    this.pushScope();
  }

  protected exitWalkType(_typeId: Value, _target: Value): void {
    const [typeId, target] = this.popScope();

    this.pushString(this.emitWalkType(typeId, target));
  }

  protected enterWalkType(_typeId: Value, _target: Value): void {
    this.pushScope();
  }

  protected exitGetAssetFromMap(_id: Value): void {
    const [id] = this.popScope();

    this.pushString(this.emitGetAssetFromMap(id));
  }

  protected enterGetAssetFromMap(_id: Value): void {
    this.pushScope();
  }

  protected exitSetAssetInMap(_id: Value, _target: Value): void {
    const [id, target] = this.popScope();

    this.pushString(this.emitSetAssetInMap(id, target));
  }

  protected enterSetAssetInMap(_id: Value, _target: Value): void {
    this.pushScope();
  }

  protected exitError(scope: string, message: string): void {
    this.pushString(this.emitError(scope, message));
  }

  protected pushString(str: string): void {
    str = str.trim().replace(/^\s+/gm, "");

    this.scopes[this.scopes.length - 1].push(str);
  }

  protected pushScope(obj?: any): void {
    this.scopes.push([]);
  }

  protected popScope(obj?: any): string[] {
    return this.scopes.pop()!;
  }

  protected getTypeName(target?: FieldReference | Type | null): string {
    let type: any;
    if (target instanceof FieldReference) {
      type = target.type;
    } else {
      type = target;
    }

    return type?.name || "TODO";
  }
}
