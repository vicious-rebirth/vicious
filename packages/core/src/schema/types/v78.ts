import { Class, field } from "../core";
import { F32 } from "./atomic";
import { StaticLight } from "./staticLight";

export class V78 extends Class {
  __id = 78;
  __offset = 0x1139b0;

  base = field(StaticLight);
  f_0x7c = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
