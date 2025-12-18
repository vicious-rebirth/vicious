import { Class, field } from "../core";
import { Action } from "./action";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { BOOL, F32 } from "./atomic";

export class CreateTemporaryBillboardAction extends Class {
  __id = 165;
  __offset = 0x22930;

  base = field(Action);
  f_0x0c = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  duration = field(F32);
  material = field(AssetReference);
  f_0x14 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
