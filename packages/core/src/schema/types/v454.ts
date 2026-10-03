import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { BOOL, U32 } from "./atomic";
import { Statement } from "./statement";

export class V454 extends Class {
  __id = 454;
  __offset = 0x22fb0;

  base = field(Statement);
  f_1 = field(U32);
  f_0x0c = field(AssetFromTypeWrap);
  f_0x10 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
