import { Class, field } from "../core";

import { U32, U16, U8 } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";

export class TextureGroup extends Class {
  __id = 11;
  __offset = 0x1a330;

  base = field(Group);
}

export class Texture extends Class {
  __id = 10;
  __folder = "Textures";
  __ext = "txr";
  __offset = 0xda310;

  base = field(Object);
  format = field(U8, {
    custom: (ctx) => {
      ctx.if(
        (ctx) => ctx.lt((ctx) => ctx.version(), 2),
        (ctx) => {
          const tmp = ctx.var(U32, 0);
          ctx.walk(tmp);
          ctx.set(this.format, tmp);
        },
        (ctx) => ctx.walk()
      );
    },
  });
  b2 = field(U8, {
    custom: (ctx) => {
      ctx.if(
        (ctx) => ctx.lt((ctx) => ctx.version(), 2),
        (ctx) => {
          const tmp = ctx.var(U32, 0);
          ctx.walk(tmp);
          ctx.set(this.b2, tmp);
        },
        (ctx) => ctx.walk()
      );
    },
  });
  b3 = field(U8, {
    custom: (ctx) => {
      ctx.if(
        (ctx) => ctx.lt((ctx) => ctx.version(), 2),
        (ctx) => {
          const tmp = ctx.var(U32, 0);
          ctx.walk(tmp);
          ctx.set(this.b3, tmp);
        },
        (ctx) => ctx.walk()
      );
    },
  });
  width = field(U16);
  height = field(U16);
}
