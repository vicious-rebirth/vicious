import { ClassCodec, field } from "../core";

import { AssetFromType, AssetReferenceSuffix } from "./asset";
import { U32, BOOL } from "./atomic";
import { FN_0x5e2d0 } from "./fns";
import { Script } from "./script";
import { V160 } from "./v160";
import { V301 } from "./v301";

export class V470 extends ClassCodec {
  __id = 470;

  base = field(V160);
  f_0x40 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x44 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  onCollide = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x64 = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  old = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3) });
  f_0x68 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x6c = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x70 = field(AssetReferenceSuffix, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  v301 = field(V301, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 1),
        (ctx) => ctx.lt((ctx) => ctx.version(), 4)
      ),
  });
  f_1 = field(FN_0x5e2d0, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
}
