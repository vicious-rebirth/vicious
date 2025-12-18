import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { V108 } from "./v108";
import { V301 } from "./v301";

export class V213 extends Class {
  __id = 213;
  __offset = 0x59330;

  base = field(V108);
  f_0x04 = field(V301);
  f_1 = field(AssetReference);
}
