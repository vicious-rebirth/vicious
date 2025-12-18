import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { BOOL } from "./atomic";
import { V108 } from "./v108";

export class V492 extends Class {
  __id = 492;
  __offset = 0x34cf0;

  base = field(V108);
  f_1 = field(AssetFromType);
  f_2 = field(AssetFromType);
  f_0x0c = field(BOOL);
}
