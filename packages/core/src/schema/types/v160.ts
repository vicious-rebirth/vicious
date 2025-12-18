import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { BOOL, U32 } from "./atomic";
import { Base } from "./base";
import { Label } from "./label";
import { Vector3 } from "./math";

export class V160 extends Class {
  __id = 160;
  __offset = 0x27510;

  base = field(Base);
  f_1 = field(AssetReference);
  label = field(Label);
  f_0x20 = field(U32);
  f_0x24 = field(Vector3);
  f_0x30 = field(Vector3);
  f_0x3c = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
