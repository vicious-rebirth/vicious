import { Struct, field } from "../core";

import { AssetFromType, AssetReference } from "./asset";
import { I32, U32, U8 } from "./atomic";
import { V421 } from "./v421";

export class FN_0x22520 extends Struct {
  __metadata = true;

  f_0x00 = field(U32);
  f_0x04 = field(AssetReference);
  f_0x08 = field(U32);
}

export class FN_0x22080 extends Struct {
  __metadata = true;

  object = field(AssetFromType);
}

export class FN_0x21c40 extends Struct {
  __metadata = true;

  f_0x00 = field(U8);
  f_0x01 = field(U8);
  f_0x02 = field(U8);
  f_1 = field(AssetReference);
}

export class FN_0x21dd0 extends Struct {
  __metadata = true;

  f_0x00 = field(U32);
  f_0x04 = field(AssetReference);
}

export class FN_0x224c0 extends Struct {
  __metadata = true;

  f_0x00 = field(U32);
  f_0x04 = field(AssetReference);
}

export class FN_0x5e2d0 extends Struct {
  count = field(I32);
  list = field((ctx) => ctx.list(FN_0x21c40), {
    condition: (ctx) => ctx.gt(this.count, 0),
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class FN_0x21f40 extends Struct {
  version = field(U32, { skip: true });
  targetVersion = field(U32, { skip: true });
  v421 = field(V421, {
    condition: (ctx) => ctx.lte(this.targetVersion, this.version),
  });
  object = field(AssetReference, {
    condition: (ctx) => ctx.gt(this.targetVersion, this.version),
  });
  f_1 = field(U32, {
    condition: (ctx) => ctx.gt(this.targetVersion, this.version),
  });
}
