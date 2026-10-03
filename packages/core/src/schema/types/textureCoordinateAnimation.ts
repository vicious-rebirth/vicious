import { Class, Struct, deprecated, field } from "../core";
import { U8, U32 } from "./atomic";
import { Base } from "./base";

export class TextureCoordinateAnimation extends Class {
  __id = 71;
  __offset = 0x107430;

  base = field(Base);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  mode = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  columns = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  rows = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  firstFrame = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  lastFrame = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  framesPerSecond = field(U8, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  channels = field((ctx) => ctx.array(TextureAnimationChannel, 5));
}

export class TextureAnimationChannel extends Struct {
  __offset = 0x10757d;

  waveform = field(U32);
  parameters = field((ctx) => ctx.array(U8, 16));
}
