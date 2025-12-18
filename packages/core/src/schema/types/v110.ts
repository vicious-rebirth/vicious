import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { U32 } from "./atomic";
import { V108 } from "./v108";

export class V110 extends Class {
  __id = 110;
  __offset = 0x353d0;

  base = field(V108);
  f_0x04 = field(U32);
  f_0x08 = field(AssetFromType);
}
