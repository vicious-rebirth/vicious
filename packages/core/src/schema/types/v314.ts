import { Class, MetadataCodec, field } from "../core";

import { AssetFromType, AssetReference } from "./asset";
import { F32, U32 } from "./atomic";
import { V19 } from "./v19";
import { V71 } from "./v71";

export class V314 extends Class {
  __id = 314;

  base = field(V19);
  f_0x44 = field(AssetReference);
  f_0x48 = field(AssetReference);
  f_0x74 = field(V71);
  f_0x6c = field(U32);
  f_0x70 = field(U32);
  f_0xe8 = field(F32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0xec = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_1 = field(V314_1);
}

export class V314_1 extends MetadataCodec {
  f_1 = field(AssetFromType);
}
