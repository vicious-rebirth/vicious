import { Class, Struct, field } from "../core";

import { AssetFromType } from "./asset";
import { F32, I32, U32, U16, BOOL } from "./atomic";
import { U8Buffer } from "./buffer";
import { Group } from "./group";
import { Object } from "./object";

export class AnimationGroup extends Class {
  __id = 47;
  __offset = 0x1a330;

  base = field(Group);
}

export class Animation extends Class {
  __id = 46;
  __folder = "Animations";
  __ext = "anm";
  __offset = 0x10c660;

  base = field(Object);
  rate = field(I32, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2) });
  length = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  frameCount = field(U16, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  jointFlagCount = field(U16, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  looping = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x4d = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x4e = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x4f = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  rotationCount = field(I32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  positionCount = field(I32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  scaleCount = field(I32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  positionScale = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  scaleScale = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  jointFlags = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 2),
        (ctx) => ctx.gt(this.jointFlagCount, 0)
      ),
    custom: (ctx) => {
      ctx.set(this.jointFlags.size, this.jointFlagCount);
      ctx.walk();
    },
  });
  rotationBuffer = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 2),
        (ctx) => ctx.gt((ctx) => ctx.mul(this.rotationCount, 4), 0)
      ),
    custom: (ctx) => {
      ctx.set(this.rotationBuffer.size, (ctx) =>
        ctx.mul(this.rotationCount, 8)
      );
      ctx.walk();
    },
  });
  positionBuffer = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 2),
        (ctx) => ctx.gt((ctx) => ctx.mul(this.positionCount, 3), 0)
      ),
    custom: (ctx) => {
      ctx.set(this.positionBuffer.size, (ctx) =>
        ctx.mul(this.positionCount, 6)
      );
      ctx.walk();
    },
  });
  scaleBuffer = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 2),
        (ctx) => ctx.gt((ctx) => ctx.mul(this.scaleCount, 3), 0)
      ),
    custom: (ctx) => {
      ctx.set(this.scaleBuffer.size, (ctx) => ctx.mul(this.scaleCount, 6));
      ctx.walk();
    },
  });
  rotationIndices = field(AnimationIndexBuffer, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  positionIndices = field(AnimationIndexBuffer, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  scaleIndices = field(AnimationIndexBuffer, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x74 = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt((ctx) => ctx.version(), 2),
        (ctx) => ctx.gt(this.f_0x4f, 0)
      ),
    custom: (ctx) => {
      ctx.set(this.f_0x74.size, (ctx) => ctx.shl(this.frameCount, 2));
      ctx.walk();
    },
  });
  f_4 = field(U8Buffer, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
    custom: (ctx) => {
      ctx.set(this.f_4.consume, true);
      ctx.walk(this.f_4);
    },
  });
  f_5 = field(AnimationIndexBuffer, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}

export class AnimationIndexBuffer extends Struct {
  __offset = 0x120f0;

  count = field(U32);
  buffer = field(U8Buffer, {
    custom: (ctx) => {
      ctx.set(this.buffer.size, (ctx) => ctx.mul(this.count, 2));

      ctx.walk();
    },
  });
}

export class CustomAnimation extends Class {
  __id = 406;
  __folder = "CustomAnimations";
  __ext = "can";
  __offset = 0x273e0;

  base = field(Object);
  f_1 = field(AssetFromType);
}
