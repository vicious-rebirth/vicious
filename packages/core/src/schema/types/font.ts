import { ClassCodec, Codec, field } from "../core";

import { AssetReference } from "./asset";
import { F32, I32, U32, U8 } from "./atomic";
import { U8Buffer } from "./buffer";
import { Empty } from "./empty";
import { Group } from "./group";
import { Object } from "./object";

export class FontGroup extends ClassCodec {
  __id = 65;

  base = field(Group);
}

export class Font extends ClassCodec {
  __id = 64;
  __folder = "Fonts";
  __ext = "fnt";

  base = field(Object);
  material = field(AssetReference);
  f_0x48 = field(F32);
  f_0x4c = field(F32);
  f_0x50 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x40 = field(U32);
  f_0x154 = field(F32);
  glyphs = field(FontGlyphs, {
    custom: (ctx) => {
      ctx.set(this.glyphs.count, 256);
      ctx.walk();
    },
  });
  f_2 = field(U8Buffer, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
    custom: (ctx) => {
      ctx.set(this.f_2.size, 256);
      ctx.walk();
    },
  });
  empty = field(Empty, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}

export class FontGlyphs extends Codec {
  count = field(I32, { skip: true });
  list = field((ctx) => ctx.list(FontGlyph), {
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class FontGlyph extends Codec {
  f_1 = field(U8);
  f_2 = field(U8);
  f_3 = field(U8);
  f_4 = field(U8);
}
