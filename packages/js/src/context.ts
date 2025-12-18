import {
  ANY,
  BOOL,
  DecoderContext,
  EncoderContext,
  F32,
  I8,
  I16,
  I32,
  ID,
  U8,
  U16,
  U32,
} from "./generated";
import { idToString } from "./util";

export class AssetStore {
  private store: Record<string, { type: string; asset: any }> = {};

  public setId(id: ID, type: string, asset: any): void {
    this.store[idToString(id)] = { type, asset };
  }

  public getId(id: ID): { type: string; asset: any } | null {
    return this.store[idToString(id)] || null;
  }
}

class ArrayBufferBase {
  public readonly view: DataView;
  public readonly store: AssetStore;

  protected offset: number = 0;
  protected readonly littleEndian: boolean = true;

  public constructor(buffer: ArrayBuffer, store?: AssetStore) {
    this.view = new DataView(buffer);
    this.store = store || new AssetStore();
  }

  protected ensure(bytes: number) {
    if (this.offset + bytes > this.view.byteLength) {
      throw new RangeError(
        `Out of bounds read: need ${bytes} bytes at offset ${this.offset}, buffer length ${this.view.byteLength}`
      );
    }
  }

  public error(scope: string, message: string): void {
    console.error(`${scope}:`, message);
    debugger;
  }

  public setId(id: ID, type: string, asset: any): void {
    this.store.setId(id, type, asset);
  }

  public getId(id: ID): { type: string; asset: any } | null {
    return this.store.getId(id);
  }

  protected setOffset(value: U32) {
    this.offset = value;
  }

  public tell(): U32 {
    return this.offset;
  }

  public seek(offset: U32): void {
    if (offset > this.view.byteLength) {
      throw new RangeError(`seek out of bounds: ${offset}`);
    }
    this.setOffset(offset);
  }
}

export class ArrayBufferReader
  extends ArrayBufferBase
  implements DecoderContext
{
  public readANY(): ANY {}

  public readBOOL(): BOOL {
    return this.readU8() !== 0;
  }

  public readI8(): I8 {
    this.ensure(1);
    const v = this.view.getInt8(this.offset);
    this.setOffset(this.offset + 1);
    return v;
  }

  public readU8(): U8 {
    this.ensure(1);
    const v = this.view.getUint8(this.offset);
    this.setOffset(this.offset + 1);
    return v;
  }

  public readI16(): I16 {
    this.ensure(2);
    const v = this.view.getInt16(this.offset, this.littleEndian);
    this.setOffset(this.offset + 2);
    return v;
  }

  public readU16(): U16 {
    this.ensure(2);
    const v = this.view.getUint16(this.offset, this.littleEndian);
    this.setOffset(this.offset + 2);
    return v;
  }

  public readI32(): I32 {
    this.ensure(4);
    const v = this.view.getInt32(this.offset, this.littleEndian);
    this.setOffset(this.offset + 4);
    return v;
  }

  public readU32(): U32 {
    this.ensure(4);
    const v = this.view.getUint32(this.offset, this.littleEndian);
    this.setOffset(this.offset + 4);
    return v;
  }

  public readF32(): F32 {
    this.ensure(4);
    const v = this.view.getFloat32(this.offset, this.littleEndian);
    this.setOffset(this.offset + 4);
    return v;
  }
}

export class ArrayBufferWriter
  extends ArrayBufferBase
  implements EncoderContext
{
  public writeANY(): ANY {}

  public writeBOOL(value: BOOL): void {
    return this.writeU8(value ? 1 : 0);
  }

  public writeI8(value: I8): void {
    this.ensure(1);
    this.view.setInt8(this.offset, value);
    this.setOffset(this.offset + 1);
  }

  public writeU8(value: U8): void {
    this.ensure(1);
    this.view.setUint8(this.offset, value);
    this.setOffset(this.offset + 1);
  }

  public writeI16(value: I16): void {
    this.ensure(2);
    this.view.setInt16(this.offset, value, this.littleEndian);
    this.setOffset(this.offset + 2);
  }

  public writeU16(value: U16): void {
    this.ensure(2);
    this.view.setUint16(this.offset, value, this.littleEndian);
    this.setOffset(this.offset + 2);
  }

  public writeI32(value: I32): void {
    this.ensure(4);
    this.view.setInt32(this.offset, value, this.littleEndian);
    this.setOffset(this.offset + 4);
  }

  public writeU32(value: U32): void {
    this.ensure(4);
    this.view.setUint32(this.offset, value, this.littleEndian);
    this.setOffset(this.offset + 4);
  }

  public writeF32(value: F32): void {
    this.ensure(4);
    this.view.setFloat32(this.offset, value, this.littleEndian);
    this.setOffset(this.offset + 4);
  }
}
