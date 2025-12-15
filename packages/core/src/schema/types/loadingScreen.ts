import { Class, field } from "../core";

import { AssetReference } from "./asset";
import { LocalizedObject } from "./localizedObject";

export class LoadingScreen extends Class {
  __id = 399;
  __folder = "LoadingScreens";
  __ext = "ls";
  __offset = 0x29970;

  base = field(LocalizedObject);
  dialog = field(AssetReference);
}
