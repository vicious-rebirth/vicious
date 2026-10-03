import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { Statement } from "./statement";

export class V394 extends Class {
  __id = 394;
  __offset = 0x22e40;

  base = field(Statement);
  f_1 = field(U32);
  f_0x0c = field(AssetFromTypeWrap);
}
