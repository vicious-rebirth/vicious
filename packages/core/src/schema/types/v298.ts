import { Class, Struct, deprecated, field } from "../core";
import { V19 } from "./v19";

export class V298 extends Class {
  __id = 298;
  __offset = 0x112b70;

  base = field(V19);
  f_1 = field(V298_1);
}

export class V298_1 extends Struct {
  __metadata = true;
  __offset = 0xf5ea0;

  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
}
