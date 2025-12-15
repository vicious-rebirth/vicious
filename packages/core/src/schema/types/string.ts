import { ClassCodec, Codec, field } from "../core";

import { U32, U16 } from "./atomic";
import { Base } from "./base";
import { StringBuffer } from "./buffer";
import { Empty } from "./empty";

export class String extends ClassCodec {
  __id = 135;

  base = field(Base);
  old = field(Empty, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2) });
  buffer = field(StringBuffer, {
    custom: (ctx) => {
      ctx.set(this.buffer.consume, 1);
      ctx.walk(this.buffer);
    },
  });
  old2 = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3) });
  id = field(StringID);
}

export class StringID extends Codec {
  index = field(U16);
  unique = field(U16);
}
