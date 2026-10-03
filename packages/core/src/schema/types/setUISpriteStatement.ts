import { Class, field } from "../core";
import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";
import { SpriteSelector } from "./spriteSelector";
import { Statement } from "./statement";

export class SetUISpriteStatement extends Class {
  __id = 367;
  __offset = 0x4b4b0;

  base = field(Statement);
  target = field(FN_0x22520);
  stateIndex = field(U32);
  sprite = field(SpriteSelector);
}
