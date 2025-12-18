import { Class, Struct, field } from "../core";
import { F32, U32 } from "./atomic";
import { Group } from "./group";
import { Vector3 } from "./math";
import { Object } from "./object";

export class PathGroup extends Class {
  __id = 25;
  __offset = 0x1a330;

  base = field(Group);
}

export class Path extends Class {
  __id = 24;
  __folder = "Paths";
  __ext = "pth";
  __offset = 0x118c50;

  base = field(Object);
  body = field(PathBody);
  maxKey = field(F32);
}

export class PathBody extends Struct {
  __offset = 0x75870;

  count = field(U32);
  frames = field((ctx) => ctx.list(PathFrame), {
    custom: (ctx) => {
      ctx.allocate(this.frames, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.frames, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class PathFrame extends Struct {
  __offset = 0xec190;

  position = field(Vector3);
  f_1 = field(U32);
  key = field(F32);
}
