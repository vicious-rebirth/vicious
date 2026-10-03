import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Statement } from "./statement";

export class AssignPlayerEntityStatement extends Class {
  __id = 167;
  __offset = 0x48a60;

  base = field(Statement);
  old = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2) });
  player = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  target = field(EntitySelector);
}
