import { Class, deprecated, field } from "../core";
import { BOOL, U32 } from "./atomic";
import { Base } from "./base";
import { Label } from "./label";

export class V325 extends Class {
  __id = 325;

  base = field(Base);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  label = field(Label);
  f_0x1c = field(U32);
  f_0x20 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
