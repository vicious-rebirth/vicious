import { Class, Struct, field } from "../core";
import { BOOL, F32, U16, U32 } from "./atomic";
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
  volume = field(F32);
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
  fmtChunk = field(WAVFmtChunk, {
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

export class WAVFmtChunk extends Struct {
  format = field(U16);
  channels = field(U16);
  sampleRate = field(U32);
  byteRate = field(U32);
  blockAlign = field(U16);
  bitsPerSample = field(U16);
  cbSize = field(U16);
}
