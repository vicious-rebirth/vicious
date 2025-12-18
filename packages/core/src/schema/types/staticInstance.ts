import { Class, field } from "../core";
import { AssetFromType, AssetReference } from "./asset";
import { BOOL, F32, U32 } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class StaticInstanceGroup extends Class {
  __id = 104;
  __offset = 0x1a330;

  base = field(Group);
}

export class StaticInstance extends Class {
  __id = 103;
  __folder = "StaticInstances";
  __ext = "sti";
  __offset = 0x2ecb0;

  base = field(Object);
  f_0x40 = field(AssetReference);
  model = field(AssetFromType);

  // TODO: Something here?

  f_0x48 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x4c = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x50 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  old = field(U32, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 5),
        (ctx) => ctx.lt((ctx) => ctx.version(), 9)
      ),
  });
  f_0x54 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
}
