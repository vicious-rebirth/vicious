import { Class, field } from "../core";
import { BOOL, U32 } from "./atomic";
import { CameraSelector } from "./cameraSelector";
import { Statement } from "./statement";

export class V434 extends Class {
  __id = 434;
  __offset = 0x3ed10;

  base = field(Statement);
  f_1 = field(CameraSelector);
  f_0x40 = field(BOOL);
  f_0x44 = field(U32);
}
