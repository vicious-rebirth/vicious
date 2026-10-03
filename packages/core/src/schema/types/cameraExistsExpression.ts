import { Class, field } from "../core";
import { CameraSelector } from "./cameraSelector";
import { ValueExpression } from "./valueExpression";

export class CameraExistsExpression extends Class {
  __id = 455;
  __offset = 0x5a450;

  base = field(ValueExpression);
  camera = field(CameraSelector);
}
