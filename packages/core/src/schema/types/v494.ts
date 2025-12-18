import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { V369 } from "./v369";
import { V421 } from "./v421";

export class V494 extends Class {
  __id = 494;
  __offset = 0x523d0;

  base = field(V369);
  f_1 = field(AssetFromTypeWrap);
  f_2 = field(U32);
  f_0x0c = field(V421);
}
