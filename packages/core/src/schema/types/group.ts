import { Class, Codec, field } from "../core";

import { AssetReference } from "./asset";
import { ANY, U32, BOOL } from "./atomic";
import { Base } from "./base";

export class Group extends Class {
  __id = 4;

  base = field(Base);
  list = field((ctx) => ctx.list(GroupEntry), {
    custom: (ctx) => {
      ctx.loop((ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
        ctx.if(
          (ctx) =>
            ctx.neq(
              ctx.not(
                (ctx) => ctx.index(this.list, (ctx) => ctx.iterator()).enabled
              ),
              0
            ),
          (ctx) => ctx.break()
        );
      });
    },
  });
}

export class GroupEntry extends Codec {
  enabled = field(BOOL);
  asset = field(AssetReference, {
    condition: (ctx) => ctx.neq(this.enabled, 0),
  });
}

export class GroupListEntry extends Codec {
  enabled = field(BOOL);
  type = field(U32, { condition: (ctx) => ctx.neq(this.enabled, 0) });
  object = field(ANY, {
    condition: (ctx) => ctx.neq(this.enabled, 0),
    custom: (ctx) => {
      ctx.walkId(this.type, this.object);
    },
  });
}

export class GroupList extends Codec {
  count = field(U32);
  list = field((ctx) => ctx.list(GroupListEntry), {
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}
