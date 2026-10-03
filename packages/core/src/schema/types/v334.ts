import { Class, field } from "../core";
import { U32 } from "./atomic";
import { CameraSelector } from "./cameraSelector";
import { Statement } from "./statement";

export class V334 extends Class {
  __id = 334;
  __offset = 0x3e6f0;

  base = field(Statement);
  f_1 = field(U32);
  f_0xc = field(CameraSelector);
}
