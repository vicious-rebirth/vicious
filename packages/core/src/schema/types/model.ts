import { Class, MetadataCodec, field } from "../core";

import { BOOL } from "./atomic";
import { U8Buffer } from "./buffer";
import { Transform } from "./math";
import { V26 } from "./v26";

export class Model extends Class {
  __id = 29;

  base = field(V26);
  transform = field(Transform);
  vertexBuffer = field(VertexBuffer);
}

export class VertexBuffer extends MetadataCodec {
  enabled = field(BOOL);
  buffer = field(U8Buffer, {
    custom: (ctx) => {
      ctx.if(
        (ctx) => ctx.neq(this.enabled, 0),
        (ctx) => {
          ctx.set(this.buffer.consume, true);
          ctx.walk();
        }
      );
    },
  });
}
