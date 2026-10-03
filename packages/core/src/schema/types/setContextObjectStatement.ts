import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { U32 } from "./atomic";
import { Statement } from "./statement";

export class SetContextObjectStatement extends Class {
  __id = 246;
  __offset = 0x24370;

  base = field(Statement);
  slot = field(U32);
  object = field(AssetFromType);
}
