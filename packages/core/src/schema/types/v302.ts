import { Class, deprecated, field } from "../core";
import { FN_0x224c0, FN_0x22080 } from "./fns";
import { V300 } from "./v300";

export class V302 extends Class {
  __id = 302;
  __offset = 0x3d730;

  base = field(V300);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  f_1 = field(FN_0x22080);
  f_2 = field(FN_0x224c0);
}
