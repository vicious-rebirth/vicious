import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { BOOL, F32, U32 } from "./atomic";
import { V34 } from "./v34";

export class V467 extends Class {
  __id = 467;
  __offset = 0xe57a0;

  base = field(V34);
  f_0x44 = field(AssetReference);
  f_0x48 = field(U32);
  f_0x4c = field(F32);
  f_0x50 = field(BOOL);
  f_0x54 = field(F32);
  f_0x58 = field(F32);
  f_0x5c = field(F32);
  f_0x60 = field(F32);
  f_0x64 = field(U32);
}
