import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { U16, U32 } from "./atomic";
import { Base } from "./base";
import { Label } from "./label";

export class V161 extends Class {
  __id = 161;
  __offset = 0x276b0;

  base = field(Base);
  attachment = field(AssetReference);
  target = field(Label);
  f_0x20 = field(U32);
  f_0x24 = field(U16, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
