import { Struct, field } from "../core";

import { AssetReference } from "./asset";
import { U32, BOOL } from "./atomic";

export class LocalizationTable extends Struct {
  __offset = 0xca590;

  enabled = field(BOOL);
  table = field(AssetReference, {
    condition: (ctx) => ctx.isTrue(this.enabled),
  });
}

export class LocalizationEntry extends Struct {
  __metadata = true;
  __offset = 0xca570;

  tables = field((ctx) => ctx.list(LocalizationTable), {
    custom: (ctx) => {
      ctx.allocate(this.tables);

      ctx.loop((ctx) => {
        ctx.grow(this.tables, (ctx) => ctx.iterator());

        ctx.walk((ctx) => ctx.index(this.tables, (ctx) => ctx.iterator()));

        ctx.if(
          (ctx) =>
            ctx.isFalse(
              (ctx) => ctx.index(this.tables, (ctx) => ctx.iterator()).enabled
            ),
          (ctx) => ctx.break()
        );
      });
    },
  });
}

export class Localization extends Struct {
  __metadata = true;
  __offset = 0xca653;

  count = field(U32);
  entries = field((ctx) => ctx.list(LocalizationEntry), {
    custom: (ctx) => {
      ctx.allocate(this.entries, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.entries, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class LocalizationFile extends Struct {
  __offset = 0xca64a;

  magicHeader = field(U32, {
    custom: (ctx) => {
      ctx.walk();

      ctx.if(
        (ctx) => ctx.neq(this.magicHeader, 0xfaaffaaf),
        (ctx) => ctx.error("bad file header")
      );
    },
  });
  version = field(U32);
  content = field(Localization);
  magicFooter = field(U32, {
    custom: (ctx) => {
      ctx.walk();

      ctx.if(
        (ctx) => ctx.neq(this.magicFooter, 0xfeeffeef),
        (ctx) => ctx.error("bad file footer")
      );
    },
  });
}
