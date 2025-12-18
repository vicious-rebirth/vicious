import { Class, Struct, field } from "../core";
import { AssetReference } from "./asset";
import { ANY, BOOL, U32 } from "./atomic";
import { Base } from "./base";

export class Group extends Class {
  __id = 4;
  __offset = 0xca470;

  base = field(Base);
  list = field((ctx) => ctx.list(GroupEntry, 512), {
    custom: (ctx) => {
      ctx.allocate(this.list);

      ctx.loop((ctx) => {
        ctx.grow(this.list, (ctx) => ctx.iterator());

        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));

        ctx.if(
          (ctx) =>
            ctx.isFalse(
              (ctx) => ctx.index(this.list, (ctx) => ctx.iterator()).enabled
            ),
          (ctx) => ctx.break()
        );
      });
    },
  });
}

export class GroupEntry extends Struct {
  __offset = 0xca470;

  enabled = field(BOOL);
  asset = field(AssetReference, {
    condition: (ctx) => ctx.isTrue(this.enabled),
  });
}

export class GroupListEntry extends Struct {
  __offset = 0xc9e24;

  enabled = field(BOOL);
  type = field(U32, { condition: (ctx) => ctx.isTrue(this.enabled) });
  object = field(ANY, {
    condition: (ctx) => ctx.isTrue(this.enabled),
    custom: (ctx) => {
      ctx.walkId(this.type, this.object);
    },
  });
}

export class GroupList extends Struct {
  __offset = 0xc9db0;

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
