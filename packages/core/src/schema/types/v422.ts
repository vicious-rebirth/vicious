import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { FN_0x21dd0, FN_0x22080 } from "./fns";
import { V300 } from "./v300";

export class V422 extends Class {
  __id = 422;
  __offset = 0x3c950;

  base = field(V300);
  f_1 = field(FN_0x22080);
  f_2 = field(FN_0x21dd0);
  f_0x10 = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
