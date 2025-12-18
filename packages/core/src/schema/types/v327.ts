import { Class, field } from "../core";
import { AssetFromTypeSizedList } from "./asset";
import { V173 } from "./v173";

export class V327 extends Class {
  __id = 327;
  __offset = 0x4df90;

  base = field(V173);
  f_0x08 = field(AssetFromTypeSizedList);
}
