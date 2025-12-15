import { ClassCodec, field } from "../core";

import {
  AssetFromTypeSizedList,
  AssetReference,
  AssetReferenceSuffix,
} from "./asset";
import { U32, BOOL } from "./atomic";
import { Base } from "./base";
import { StringBuffer } from "./buffer";
import { Group } from "./group";
import { LocalizedObject } from "./localizedObject";
import { Script } from "./script";

export class CinematicGroup extends ClassCodec {
  __id = 360;

  base = field(Group);
}

export class Cinematic extends ClassCodec {
  __id = 363;
  __folder = "Cinematic";
  __ext = "cin";

  base = field(LocalizedObject);
  content = field(CinematicContent);
}

export class CinematicContent extends ClassCodec {
  __id = 355;
  __folder = "Cinematics";
  __ext = "cin";

  base = field(Object);
  keyframes = field(AssetFromTypeSizedList);
  f_0x48 = field(BOOL);
  f_0x49 = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x4a = field(BOOL);
  dialog = field(AssetReferenceSuffix, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x54 = field(AssetReferenceSuffix, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  onEnded = field(Script, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}

export class CinematicFrame extends ClassCodec {
  __id = 356;

  base = field(Base);
  name = field(StringBuffer, {
    custom: (ctx) => {
      ctx.set(this.name.consume, 1);
      ctx.walk();
    },
  });
  time = field(U32);
  onCinematicEvent = field(Script);
  f_0x28 = field(AssetReference);
  f_0x2c = field(AssetReferenceSuffix, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  f_0x34 = field(AssetReference, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x38 = field(AssetReferenceSuffix, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
}
