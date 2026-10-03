import { Class, deprecated, field } from "../core";
import {
  AssetFromType,
  AssetFromTypeSizedList,
  AssetFromTypeWrap,
  AssetReference,
} from "./asset";
import { BOOL, U32 } from "./atomic";
import { Statement } from "./statement";

export class V194 extends Class {
  __id = 194;
  __offset = 0x226e0;

  base = field(Statement);
  f_0x08 = field(AssetReference);
  f_0x0c = field(U32);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 2));
  __ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 4));
  f_0x10 = field(AssetFromTypeWrap);
  f_0x14 = field(AssetFromTypeSizedList);
  f_0x1c = field(AssetFromType);
  f_0x20 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
