import { Codec, MetadataCodec, field } from "../core";

import { ANY, I32, U32, I16, BOOL } from "./atomic";
import { ID } from "./id";
import { Label } from "./label";

export class AssetReference extends Codec {
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
        (ctx) => ctx.neq(this.first, 0),
        (ctx) => {
          ctx.walkId(this.type, this.asset);
          ctx.setId(this.id, this.asset);
        },
        (ctx) => ctx.set(this.asset, (ctx) => ctx.getId(this.id))
      );
    },
  });
}

export class AssetReferenceSuffix extends Codec {
  base = field(AssetReference);
  suffix = field(U32);
}

export class AssetFromType extends Codec {
  type = field(I32);
  asset = field(ANY, {
    condition: (ctx) => ctx.neq(this.type, -1),
    custom: (ctx) => {
      ctx.walkId(this.type, this.asset);
    },
  });
}

export class AssetFromTypeWrap extends MetadataCodec {
  base = field(AssetFromType);
}

export class AssetReferenceList extends Codec {
  consume = field(BOOL, { skip: true });
  count = field(I32, { condition: (ctx) => ctx.neq(this.consume, 0) });
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

export class AssetReferenceSizedList extends Codec {
  base = field(AssetReferenceList, {
    custom: (ctx) => {
      ctx.set(this.base.consume, 1);
      ctx.walk();
    },
  });
}

export class AssetReferenceSuffixList extends Codec {
  consume = field(BOOL, { skip: true });
  count = field(I32, { condition: (ctx) => ctx.neq(this.consume, 0) });
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

export class AssetReferenceSuffixSizedList extends Codec {
  base = field(AssetReferenceSuffixList, {
    custom: (ctx) => {
      ctx.set(this.base.consume, 1);
      ctx.walk();
    },
  });
}

export class AssetFromTypeList extends Codec {
  consume = field(BOOL, { skip: true });
  count = field(I32, { condition: (ctx) => ctx.neq(this.consume, 0) });
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

export class AssetFromTypeSizedList extends Codec {
  base = field(AssetFromTypeList, {
    custom: (ctx) => {
      ctx.set(this.base.consume, 1);
      ctx.walk();
    },
  });
}
