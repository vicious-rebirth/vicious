import { Class, field } from "../core";

import { AssetFromType, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { Empty } from "./empty";
import { V63 } from "./v63";

export class SpriteMaterial extends Class {
  __id = 66;
  __offset = 0x1056a0;

  base = field(V63);
  texture = field(AssetReference);
  f_0x60 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x64 = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  empty = field(Empty, {
    offset: 0xf65f0,
  });
}
