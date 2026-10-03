import { Class, field } from "../core";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { Statement } from "./statement";

export class ViewportStatement extends Class {
  __id = 169;
  __offset = 0x24fa0;

  base = field(Statement);
  operation = field(U32);
  layout = field(U32);
  f_0x10 = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  viewportIndex = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
