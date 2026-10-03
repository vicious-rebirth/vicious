import { Class, field } from "../core";
import { AssetFromTypeWrap, AssetReference } from "./asset";
import { BOOL } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { EntityTemplateSelector } from "./entityTemplateSelector";
import { Statement } from "./statement";

export class PlaySoundStatement extends Class {
  __id = 335;
  __offset = 0x432d0;

  base = field(Statement);
  channel = field(AssetFromTypeWrap);
  target = field(EntitySelector);
  sound = field(EntityTemplateSelector, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
  sound_old = field(AssetReference, {
    condition: (ctx) => ctx.lt((ctx) => ctx.version(), 3),
  });
  stop = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
