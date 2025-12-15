import { Struct, field } from "../core";

import { AssetReference } from "./asset";
import { U32, BOOL } from "./atomic";

export class LocalizationTable extends Struct {
  enabled = field(BOOL);
  table = field(AssetReference, {
    condition: (ctx) => ctx.neq(this.enabled, 0),
  });
}

export class LocalizationEntry extends Struct {
  __metadata = true;

  tables = field((ctx) => ctx.list(LocalizationTable), {
    custom: (ctx) => {
      ctx.loop((ctx) => {
        ctx.walk((ctx) => ctx.index(this.tables, (ctx) => ctx.iterator()));

        ctx.if(
          (ctx) =>
            ctx.neq(
              ctx.not(
                (ctx) => ctx.index(this.tables, (ctx) => ctx.iterator()).enabled
              ),
              0
            ),
          (ctx) => ctx.break()
        );
      });
    },
  });
}

export class Localization extends Struct {
  __metadata = true;

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
