import { Class, field } from "../core";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { BOOL, F32 } from "./atomic";
import { Statement } from "./statement";

export class CreateTemporaryBillboardStatement extends Class {
  __id = 165;
  __offset = 0x22930;

  base = field(Statement);
  f_0x0c = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  duration = field(F32);
  material = field(AssetReference);
  f_0x14 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
