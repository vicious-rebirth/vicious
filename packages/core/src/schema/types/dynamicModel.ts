import { Class, Struct, field } from "../core";
import { BOOL } from "./atomic";
import { U8Buffer } from "./buffer";
import { DynamicGeom } from "./dynamicGeom";

export class DynamicModel extends Class {
  __id = 45;
  __offset = 0xe4050;

  base = field(DynamicGeom);
  data = field(DynamicModelVertexData, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}

export class DynamicModelVertexData extends Struct {
  __metadata = true;
  __offset = 0xdb790;

  enabled = field(BOOL);
  buffer = field(U8Buffer, {
    custom: (ctx) => {
      ctx.if(
        (ctx) => ctx.isTrue(this.enabled),
        (ctx) => {
          ctx.set(this.buffer.consume, true);
          ctx.walk();
        }
      );
    },
  });
}
