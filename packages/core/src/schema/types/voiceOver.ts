import { Class, Struct, field } from "../core";

import { AssetReferenceSuffix } from "./asset";
import { U32, BOOL } from "./atomic";
import { Sound } from "./sound";

export class VoiceOver extends Class {
  __id = 354;
  __folder = "VoiceOvers";
  __ext = "vo";

  base = field(Sound);
  body = field(VoiceOverBody);
  old = field(BOOL, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.lt((ctx) => ctx.version(), 3),
        (ctx) => ctx.eq(this.base.f_0x54, 10.0)
      ),
    custom: (ctx) => ctx.set(this.base.f_0x54, 40.0),
  });
}

export class VoiceOverBody extends Struct {
  __metadata = true;

  f_0x60 = field(U32);
  f_0x64 = field(AssetReferenceSuffix, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
