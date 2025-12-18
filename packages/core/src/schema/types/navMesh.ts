import { Class, Struct, deprecated, field } from "../core";
import { AssetReference } from "./asset";
import { I32, U8 } from "./atomic";
import { U8Buffer } from "./buffer";
import { Group } from "./group";
import { Vector3 } from "./math";
import { Object } from "./object";

export class NavMeshGroup extends Class {
  __id = 197;
  __offset = 0x1a330;

  base = field(Group);
}

export class NavMesh extends Class {
  __id = 196;
  __folder = "NavMeshes";
  __ext = "nav";
  __offset = 0x1180a0;

  base = field(Object);
  f_1 = field(NavMesh_1);
  f_2 = field(NavMesh_3);
  f_3 = field(U8Buffer, {
    custom: (ctx) => {
      ctx.set(this.f_3.consume, true);
      ctx.walk();
    },
  });
  f_0x4c = field(Vector3);
  f_0x58 = field(Vector3);
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
  f_0x64 = field(Vector3, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
  f_0x70 = field(NavMesh_5, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}

export class NavMesh_1 extends Struct {
  __offset = 0x5e460;

  count = field(I32);
  list = field((ctx) => ctx.list(NavMesh_2), {
    condition: (ctx) => ctx.gt(this.count, 0),
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class NavMesh_2 extends Struct {
  __offset = 0x36d20;

  f_1 = field((ctx) => ctx.array(U8, 3));
  f_2 = field((ctx) => ctx.array(U8, 3));
  f_3 = field(U8);
  f_4 = field(U8);
}

export class NavMesh_3 extends Struct {
  __offset = 0x5e4d0;

  count = field(I32);
  list = field((ctx) => ctx.list(NavMesh_4), {
    condition: (ctx) => ctx.gt(this.count, 0),
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class NavMesh_4 extends Struct {
  __offset = 0x5e4d0;

  data = field((ctx) => ctx.array(U8, 6));
}

export class NavMesh_5 extends Struct {
  __offset = 0x5f6e0;

  count = field(I32);
  list = field((ctx) => ctx.list(NavMesh_6), {
    condition: (ctx) => ctx.gt(this.count, 0),
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class NavMesh_6 extends Struct {
  __offset = 0x5f6e0;

  f_1 = field(AssetReference);
  f_2 = field(U8);
  f_3 = field(U8);
  f_4 = field(U8);
}
