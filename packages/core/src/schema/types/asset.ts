import { Struct, field } from "../core";
import { ANY, BOOL, I16, I32, U32 } from "./atomic";
import { ID } from "./id";
import { Label } from "./label";

export class AssetReference extends Struct {
  __offset = 0xc9f90;

  type = field(I16);
  p2 = field(I16);
  id = field(ID, { condition: (ctx) => ctx.gte(this.type, 0) });
  p3 = field(U32, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gte(this.type, 0),
        (ctx) => ctx.gt(this.p2, 0)
      ),
  });
  label = field(Label, {
    condition: (ctx) => ctx.gte(this.type, 0),
  });
  first = field(BOOL, {
    condition: (ctx) => ctx.gte(this.type, 0),
  });
  asset = field(ANY, {
    condition: (ctx) => ctx.gte(this.type, 0),
    custom: (ctx) => {
      ctx.if(
        (ctx) => ctx.isTrue(this.first),
        (ctx) => {
          ctx.walkId(this.type, this.asset);
          ctx.setId(this.id, this.type, this.asset);
        },
        (ctx) => ctx.set(this.asset, (ctx) => ctx.getId(this.id))
      );
    },
  });
}

export class AssetReferenceSuffix extends Struct {
  __offset = 0x1e2e0;

  base = field(AssetReference);
  suffix = field(U32);
}

export class AssetFromType extends Struct {
  __offset = 0x1e3b0;

  type = field(I32);
  asset = field(ANY, {
    condition: (ctx) => ctx.neq(this.type, -1),
    custom: (ctx) => {
      ctx.walkId(this.type, this.asset);
    },
  });
}

export class AssetFromTypeWrap extends Struct {
  __metadata = true;
  __offset = 0x19a70;

  base = field(AssetFromType);
}

export class AssetReferenceList extends Struct {
  __offset = 0x12090;

  consume = field(BOOL, { skip: true });
  count = field(I32, { condition: (ctx) => ctx.isTrue(this.consume) });
  list = field((ctx) => ctx.list(AssetReference), {
    condition: (ctx) => ctx.gt(this.count, 0),
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class AssetReferenceSizedList extends Struct {
  __offset = 0x10be70;

  base = field(AssetReferenceList, {
    custom: (ctx) => {
      ctx.set(this.base.consume, true);
      ctx.walk();
    },
  });
}

export class AssetReferenceSuffixList extends Struct {
  __offset = 0x1e440;

  consume = field(BOOL, { skip: true });
  count = field(I32, { condition: (ctx) => ctx.isTrue(this.consume) });
  list = field((ctx) => ctx.list(AssetReferenceSuffix), {
    condition: (ctx) => ctx.gt(this.count, 0),
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) =>
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()))
      );
    },
  });
}

export class AssetReferenceSuffixSizedList extends Struct {
  __offset = 0x1e440;

  base = field(AssetReferenceSuffixList, {
    custom: (ctx) => {
      ctx.set(this.base.consume, true);
      ctx.walk();
    },
  });
}

export class AssetFromTypeList extends Struct {
  consume = field(BOOL, { skip: true });
  count = field(I32, { condition: (ctx) => ctx.isTrue(this.consume) });
  list = field((ctx) => ctx.list(AssetFromType), {
    condition: (ctx) => ctx.gt(this.count, 0),
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class AssetFromTypeSizedList extends Struct {
  __offset = 0xc9b00;

  base = field(AssetFromTypeList, {
    custom: (ctx) => {
      ctx.set(this.base.consume, true);
      ctx.walk();
    },
  });
}
