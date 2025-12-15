import { Class, field } from "../core";

import { AssetFromTypeSizedList, AssetReference } from "./asset";
import { U32 } from "./atomic";
import { IDList } from "./id";
import { Vector3 } from "./math";
import { Script } from "./script";
import { V252 } from "./v252";
import { V405 } from "./v405";
import { World } from "./world";

export class Map extends Class {
  __id = 101;
  __folder = "Maps";
  __ext = "map";

  base = field(World);
  f_1 = field(IDList, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 4),
  });
  f_2 = field(IDList, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 4),
  });
  f_0x31d0 = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  f_0x338c = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  onMapStarted = field(Script);
  onMapEnded = field(Script);
  onPlayerAssigned = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 8),
  });
  onPlayerJoining = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 10),
  });
  onPlayerLeft = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 10),
  });
  onPlayerJoined = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 11),
  });
  v252 = field(V252, { condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1) });
  sky = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
    custom: (ctx) => {
      ctx.if(
        (ctx) => ctx.lt((ctx) => ctx.version(), 10),
        (ctx) => ctx.todo("sky"),
        (ctx) => ctx.walk()
      );
    },
  });
  f_0x1b8 = field(V405, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  f_0x1bc = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  gravity = field(Vector3, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 7),
  });
}
