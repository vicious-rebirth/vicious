import { ClassCodec, field } from "../core";

import { AssetFromType } from "./asset";
import { Group } from "./group";
import { Object } from "./object";

export class CameraControllerGroup extends ClassCodec {
  __id = 204;

  base = field(Group);
}

export class CameraController extends ClassCodec {
  __id = 381;
  __folder = "Camera Controllers";
  __ext = "cct";

  base = field(Object);
  f_0x44 = field(AssetFromType);
}
