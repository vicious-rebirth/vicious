import { Class, deprecated, field } from "../core";
import { AssetFromType, AssetFromTypeSizedList, AssetReference } from "./asset";
import { Statement } from "./statement";

export class CallFunctionStatement extends Class {
  __id = 115;
  __offset = 0x22b70;

  base = field(Statement);
  function = field(AssetReference);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  arguments = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
  f_0x14 = field(AssetFromType, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 2),
  });
}
