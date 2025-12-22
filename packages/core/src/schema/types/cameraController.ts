import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { Group } from "./group";
import { Object } from "./object";

export class CameraControllerGroup extends Class {
  __id = 204;
  __offset = 0x1a330;

  base = field(Group);
}

export class CameraController extends Class {
  __id = 381;
  __folder = "CameraControllers";
  __ext = "cct";
  __offset = 0x273e0;

  base = field(Object);
  f_0x44 = field(AssetFromType);
}
