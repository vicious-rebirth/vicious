import { Class, Struct, deprecated, field } from "../core";

import {
  AssetFromTypeSizedList,
  AssetReference,
  AssetReferenceSizedList,
  AssetReferenceSuffixList,
  AssetReferenceSuffixSizedList,
} from "./asset";
import { I32, U32, U8 } from "./atomic";
import { Group } from "./group";
import { Label } from "./label";
import { Transform } from "./math";
import { Object } from "./object";
import { V45 } from "./v45";

export class EntityGroup extends Class {
  __id = 141;

  base = field(Group);
}

export class EntityTemplateGroup extends Class {
  __id = 143;

  base = field(Group);
}

export class Entity extends Class {
  __id = 140;
  __folder = "Entities";
  __ext = "ent";

  base = field(Object);
  template_ = field(AssetReference);
  f_0x5c = field(U8);
  f_0x54 = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 11),
  });
  f_0x5d = field(U8);
  f_0x5e = field(U8);
  f_0x5f = field(U8);
  f_0x68 = field(U32);
  f_0x6c = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  old = field(U32, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 7),
        (ctx) => ctx.lt((ctx) => ctx.version(), 13)
      ),
  });
  f_0x70 = field(I32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 10),
  });
  transform = field(Transform);
  f_0x18b = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 5));
  f_0x44 = field(AssetReferenceSuffixList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
    custom: (ctx) => {
      ctx.set(this.f_0x44.count, 2);
      ctx.walk(this.f_0x44);
    },
  });
  body = field(EntityBody, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x80 = field(V45, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 10),
  });
}

export class EntityTemplate extends Class {
  __id = 142;
  __folder = "EntityTemplates";
  __ext = "et";

  base = field(Object);
  f_0x71 = field(U8, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 13),
  });
  modelTemplate = field(AssetReference);
  f_0x48 = field(AssetFromTypeSizedList);
  f_0x60 = field(AssetFromTypeSizedList);
  f_0x68 = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x74 = field(AssetFromTypeSizedList);
  f_0x7c = field(AssetFromTypeSizedList);
  f_0x84 = field(AssetReferenceSizedList);
  helperPointSounds = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x58 = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x88 = field(AssetReferenceSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x8c = field(AssetReferenceSuffixSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x40 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  f_0x94 = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  f_0xac = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 15),
  });
  f_0x70 = field(U8, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7) });
  f_0xc4 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 8),
  });
  f_1 = field(U8, { condition: (ctx) => ctx.eq((ctx) => ctx.version(), 10) });
  f_2 = field(U8, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 11),
        (ctx) => ctx.lt((ctx) => ctx.version(), 14)
      ),
  });
  f_0xc8 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 12),
  });
  body = field(EntityBody, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 14),
  });
}

export class EntityBody extends Struct {
  count = field(U32);
  list = field((ctx) => ctx.list(AssetReferenceSizedList), {
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}
