import { Class, deprecated, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { PathSelector } from "./pathSelector";
import { Script } from "./script";
import { Statement } from "./statement";

export class FollowPathStatement extends Class {
  __id = 125;
  __offset = 0x41e70;

  base = field(Statement);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  flags = field(U32);
  entity = field(EntitySelector);
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  path = field(PathSelector, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x4c = field(AssetFromTypeWrap);
  f_0x50 = field(AssetFromTypeWrap);
  onCompleted = field(Script);
}
