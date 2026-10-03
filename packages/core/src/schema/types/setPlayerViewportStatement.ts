import { Class, deprecated, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { Statement } from "./statement";

export class SetPlayerViewportStatement extends Class {
  __id = 168;
  __offset = 0x23c70;

  base = field(Statement);
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 2));
  player = field(AssetFromTypeWrap);
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
  viewport = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
}
