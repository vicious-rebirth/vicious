import { ClassCodec, deprecated, field } from "../core";

import { AssetReference, AssetReferenceSuffixSizedList } from "./asset";
import { U32, BOOL } from "./atomic";
import { Group } from "./group";
import { Object } from "./object";
import { Script } from "./script";
import { V56 } from "./v56";

export class TriggerGroup extends ClassCodec {
  __id = 156;

  base = field(Group);
}

export class Trigger extends ClassCodec {
  __id = 155;
  __folder = "Triggers";
  __ext = "trg";

  base = field(Object);
  f_0x98 = field(BOOL);
  onEnter = field(Script);
  onInside = field(Script);
  onExit = field(Script);
  boundingBox = field(V56);
  f_0x9c = field(U32);
  f_0xa0 = field(AssetReference);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 1));
  f_0x94 = field(AssetReferenceSuffixSizedList, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
