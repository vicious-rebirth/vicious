import { Class, field } from "../core";
import { U32 } from "./atomic";
import { CameraSelector } from "./cameraSelector";
import { Statement } from "./statement";

export class SetCameraFlagsStatement extends Class {
  __id = 326;
  __offset = 0x3ee80;

  base = field(Statement);
  setMask = field(U32);
  clearMask = field(U32);
  camera = field(CameraSelector);
}
