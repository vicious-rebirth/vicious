import { Class, deprecated, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Label } from "./label";
import { Statement } from "./statement";

export class V342 extends Class {
  __id = 342;
  __offset = 0x40a60;

  base = field(Statement);
  f_0x08 = field(U32);
  f_0x0c = field(EntitySelector);
  f_0x38 = field(EntitySelector);
  f_0x64 = field(Label);
  f_0x7c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x80 = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
}
