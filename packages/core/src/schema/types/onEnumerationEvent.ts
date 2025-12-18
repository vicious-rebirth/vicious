import { Class, deprecated, field } from "../core";
import { AssetFromType, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { Base } from "./base";

export class OnEnumerationEvent extends Class {
  __id = 278;
  __offset = 0x51190;

  base = field(Base);
  enumeration = field(AssetReference);
  enumerationId = field(U32);
  f_0x0c = field(U32);
  f_0x10 = field(AssetReference);
  script = field(AssetFromType, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 1));
}
