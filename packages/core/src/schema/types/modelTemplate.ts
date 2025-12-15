import { ClassCodec, field } from "../core";

import {
  AssetFromType,
  AssetFromTypeSizedList,
  AssetReference,
  AssetReferenceSizedList,
} from "./asset";
import { F32, U32, BOOL } from "./atomic";
import { LabelList } from "./label";
import { V34 } from "./v34";

export class ModelTemplate extends ClassCodec {
  __id = 44;

  base = field(V34);
  mesh = field(AssetReference);
  skins = field(AssetReferenceSizedList);
  surface = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
  f_0x5c = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x5d = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x5e = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x50 = field(F32);
  f_0x58 = field(U32);
  f_0x60 = field(AssetFromTypeSizedList);
  f_0x1 = field(AssetFromType, {
    condition: (ctx) => ctx.eq((ctx) => ctx.version(), 1),
  });
  f_0x68 = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x2 = field(LabelList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  f_0x5f = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  f_0x54 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 8),
  });
}
