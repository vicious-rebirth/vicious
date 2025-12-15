import { Class, Struct, field } from "../core";

import { F32, U32, U8, BOOL } from "./atomic";
import { U8Buffer } from "./buffer";
import { Group } from "./group";
import { Object } from "./object";

export class SoundGroup extends Class {
  __id = 39;
  __offset = 0x1a330;

  base = field(Group);
}

export class Sound extends Class {
  __id = 38;
  __folder = "Sounds";
  __ext = "snd";
  __offset = 0xed730;

  base = field(Object);
  duration = field(U32);
  bitDepth = field(U32);
  samplingRate = field(U32);
  speedMultiplier = field(F32);
  f_0x50 = field(BOOL);
  disabled = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x54 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  buffer = field(SoundBuffer, {
    custom: (ctx) => {
      ctx.set(this.buffer.disabled, this.disabled);
      ctx.walk(this.buffer);
    },
  });
}

export class SoundBuffer extends Struct {
  __metadata = true;
  __offset = 0xdcc50;

  disabled = field(BOOL, { skip: true });
  enabled = field(BOOL);
  sampleRate = field(U32, { condition: (ctx) => ctx.isTrue(this.enabled) });
  F_2 = field((ctx) => ctx.array(U8, 18), {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.isTrue(this.enabled),
        (ctx) => ctx.isFalse(this.disabled)
      ),
  });
  data = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.isTrue(this.enabled),
        (ctx) => ctx.isFalse(this.disabled)
      ),
    custom: (ctx) => {
      ctx.set(this.data.consume, true);
      ctx.walk();
    },
  });
}
