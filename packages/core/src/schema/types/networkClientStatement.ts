import { Class, deprecated, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { Statement } from "./statement";

export class NetworkClientStatement extends Class {
  __id = 424;
  __offset = 0x23690;

  base = field(Statement);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  operation = field(U32);
  argument = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
