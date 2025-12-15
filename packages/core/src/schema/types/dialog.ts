import { ClassCodec, deprecated, field } from "../core";

import {
  AssetFromTypeSizedList,
  AssetReference,
  AssetReferenceSizedList,
} from "./asset";
import { F32, U8, U32 } from "./atomic";
import { Group } from "./group";
import { Dimension } from "./math";
import { Object } from "./object";
import { V133 } from "./v133";

export class DialogGroup extends ClassCodec {
  __id = 139;

  base = field(Group);
}

export class Dialog extends ClassCodec {
  __id = 129;
  __folder = "Dialogs";
  __ext = "dlg";

  base = field(Object);
  f_0x48 = field(U32);
  s_14 = field(U32);
  f_0x124 = field(U32);
  f_0x88 = field(V133);
  f_0x64 = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 7),
  });
  f_0x65 = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 7),
  });
  condition = field(U32, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 7),
  });
  sprites = field(AssetReferenceSizedList, {
    condition: (ctx) =>
      ctx.or(
        (ctx) =>
          ctx.and(
            (ctx) => ctx.lt((ctx) => ctx.version(), 3),
            (ctx) => ctx.not(this.condition)
          ),
        (ctx) => ctx.gte((ctx) => ctx.version(), 3)
      ),
  });
  f_0x6c = field(AssetReferenceSizedList, {
    condition: (ctx) =>
      ctx.and(
        (ctx) =>
          ctx.or(
            (ctx) =>
              ctx.and(
                (ctx) => ctx.lt((ctx) => ctx.version(), 3),
                this.condition
              ),
            (ctx) => ctx.gte((ctx) => ctx.version(), 3)
          ),
        (ctx) => ctx.neq((ctx) => ctx.band(this.f_0x48, 0x800), 0)
      ),
  });
  f_0x70 = field(AssetReferenceSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  f_0x50 = field(U32);
  f_0x54 = field(F32);
  f_0x58 = field(F32);
  dimension = field(Dimension);
  f_1 = field(AssetReference);
  f_0x130 = field(F32);
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 4));
  events = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x13c = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
}
