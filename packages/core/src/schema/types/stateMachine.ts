import { Class, field } from "../core";
import {
  AssetFromTypeSizedList,
  AssetReference,
  AssetReferenceSuffix,
} from "./asset";
import { Group } from "./group";
import { Object } from "./object";

export class StateMachineGroup extends Class {
  __id = 183;
  __offset = 0x1a330;

  base = field(Group);
}

export class StateMachine extends Class {
  __id = 182;
  __folder = "StateMachine";
  __ext = "sm";
  __offset = 0x2e9e0;

  base = field(Object);
  f_0x40 = field(AssetReference);
  f_0x44 = field(AssetReferenceSuffix, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x4c = field(AssetFromTypeSizedList);
  f_0x54 = field(AssetFromTypeSizedList);
  f_0x5c = field(AssetFromTypeSizedList);
}
