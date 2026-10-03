import { Class, deprecated, field } from "../core";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Statement } from "./statement";
import { V421 } from "./v421";

export class V329 extends Class {
  __id = 329;
  __offset = 0x42840;

  base = field(Statement);
  f_1 = field(EntitySelector);
  f_0x4c = field(AssetFromTypeWrap);
  v421 = field(V421, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  old = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2),
  });
  old2 = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2) });
  f_0x50 = field(U32);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
  v421_2 = field(V421, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  old3 = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2),
  });
  old4 = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2) });
}
