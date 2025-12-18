import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { U32 } from "./atomic";
import { Base } from "./base";

export class V260 extends Class {
  __id = 260;
  __offset = 0x2c9c0;

  base = field(Base);
  f_0x04 = field(AssetReference);
  f_0x08 = field(U32);
  f_0x0c = field(AssetReference);
}
