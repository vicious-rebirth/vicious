import { Class, Struct, field } from "../core";
import { U16, U32 } from "./atomic";
import { Base } from "./base";
import { StringBuffer } from "./buffer";
import { Empty } from "./empty";

export class String extends Class {
  __id = 135;
  __offset = 0x6fc60;

  base = field(Base);
  old = field(Empty, {
    offset: 0x6fc80,
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 2),
  });
  buffer = field(StringBuffer, {
    custom: (ctx) => {
      ctx.set(this.buffer.consume, true);
      ctx.walk(this.buffer);
    },
  });
  old2 = field(U32, { condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3) });
  id = field(StringID);
}

export class StringID extends Struct {
  __offset = 0x6fce4;

  index = field(U16);
  unique = field(U16);
}
