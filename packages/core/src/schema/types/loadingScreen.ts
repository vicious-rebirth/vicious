import { ClassCodec, field } from "../core";

import { AssetReference } from "./asset";
import { LocalizedObject } from "./localizedObject";

export class LoadingScreen extends ClassCodec {
  __id = 399;
  __folder = "LoadingScreens";
  __ext = "ls";

  base = field(LocalizedObject);
  dialog = field(AssetReference);
}
