import { Class, field } from "../core";
import { U32 } from "./atomic";
import { CameraSelector } from "./cameraSelector";
import { ValueExpression } from "./valueExpression";

export class CameraPropertyExpression extends Class {
  __id = 207;
  __offset = 0x579e0;

  base = field(ValueExpression);
  camera = field(CameraSelector);
  property = field(U32);
}
