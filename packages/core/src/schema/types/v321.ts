import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { V108 } from "./v108";

export class V321 extends Class {
  __id = 321;
  __offset = 0x4ae90;

  base = field(V108);
  f_0x04 = field(AssetFromType);
  f_0x08 = field(AssetFromType);
}
