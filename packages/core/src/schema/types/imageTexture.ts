import { Class, Struct, field } from "../core";

import { U32, U8, BOOL } from "./atomic";
import { U8Buffer } from "./buffer";
import { Texture } from "./texture";

export class ImageTexture extends Class {
  __id = 12;
  __offset = 0xeed90;

  base = field(Texture);
  f_0x48 = field(BOOL);
  f_0x49 = field(U8, {
    custom: (ctx) => {
      ctx.if(
        (ctx) => ctx.eq((ctx) => ctx.version(), 2),
        (ctx) => {
          ctx.walk();
          ctx.set(this.f_0x49, 5);
        }
      );
      ctx.if(
        (ctx) => ctx.gt((ctx) => ctx.version(), 2),
        (ctx) => ctx.walk()
      );
    },
  });
  buffer = field(ImageTextureBuffer, {
    custom: (ctx) => {
      ctx.set(this.buffer.format, this.base.format);
      ctx.set(this.buffer.width, this.base.width);
      ctx.set(this.buffer.height, this.base.height);
      ctx.walk();
    },
  });
}

export class ImageTextureBuffer extends Struct {
  __metadata = true;

  format = field(U32, { skip: true });
  width = field(U32, { skip: true });
  height = field(U32, { skip: true });
  enabled = field(BOOL);
  levels = field(U32, { condition: (ctx) => ctx.neq(this.enabled, 0) });
  pixels = field(U8Buffer, {
    condition: (ctx) => ctx.neq(this.enabled, 0),
    custom: (ctx) => {
      const size = ctx.var(U32, 0);
      const width = ctx.var(U32, this.width);
      const height = ctx.var(U32, this.height);

      ctx.for(this.levels, (ctx) => {
        ctx.if(
          (ctx) => ctx.eq(this.format, 1),
          (ctx) => {
            ctx.set(size, (ctx) =>
              ctx.add(size, (ctx) =>
                ctx.div((ctx) => ctx.mul(width, height), 2)
              )
            );
          },
          (ctx) => {
            ctx.set(size, (ctx) =>
              ctx.add(size, (ctx) => ctx.mul(width, height))
            );
          }
        );

        ctx.set(width, (ctx) => ctx.div(width, 2));
        ctx.set(height, (ctx) => ctx.div(height, 2));
      });

      ctx.set(this.pixels.size, size);
      ctx.walk();
    },
  });
  palette = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.neq(this.enabled, 0),
        (ctx) => ctx.eq(this.format, 3)
      ),
    custom: (ctx) => {
      ctx.set(this.palette.size, 1024);
      ctx.walk();
    },
  });
}
