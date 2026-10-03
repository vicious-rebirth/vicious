import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { Statement } from "./statement";

export class V499 extends Class {
  __id = 499;
  __offset = 0x23240;

  base = field(Statement);
  f_1 = field(U32);
  f_0x0c = field(U32);
  f_0x10 = field(AssetFromTypeWrap);
}
