import { Class, deprecated, field } from "../core";
import { AssetFromTypeSizedList } from "./asset";
import { U32 } from "./atomic";
import { Base } from "./base";
import { Script } from "./script";
import { V176 } from "./v176";

export class V324 extends Class {
  __id = 324;
  __offset = 0x26a10;

  base = field(Base);
  f_0x18 = field(V176);
  f_0x24 = field(U32);
  f_0x28 = field(U32);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 5));
  f_0x50 = field(AssetFromTypeSizedList);
  onHit = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x2c = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
