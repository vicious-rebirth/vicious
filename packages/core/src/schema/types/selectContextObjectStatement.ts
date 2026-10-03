import { Class, field } from "../core";
import { AssetFromTypeSizedList, AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { Statement } from "./statement";

export class SelectContextObjectStatement extends Class {
  __id = 509;
  __offset = 0x24470;

  base = field(Statement);
  slot = field(U32);
  objects = field(AssetFromTypeSizedList);
  index = field(AssetFromTypeWrap);
}
