import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { V108 } from "./v108";

export class V208 extends Class {
  __id = 208;
  __offset = 0x24c40;

  base = field(V108);
  f_1 = field((ctx) => ctx.array(AssetFromType, 2));
}
