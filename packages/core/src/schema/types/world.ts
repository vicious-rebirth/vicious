import { Class, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { GroupList } from "./group";
import { IDList } from "./id";
import { LocalizedObject } from "./localizedObject";

export class World extends Class {
  __id = 179;

  base = field(LocalizedObject);
  groups = field(GroupList);
  f_0x4c = field(AssetFromTypeSizedList);
  ids = field(IDList, {
    condition: (ctx) => ctx.eq((ctx) => ctx.version(), 2),
  });
  f_0x54 = field(AssetFromTypeSizedList, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
}
