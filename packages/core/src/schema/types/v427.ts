import { Class, field } from "../core";
import { AssetReference } from "./asset";
import { BOOL, U32 } from "./atomic";
import { CameraSelector } from "./cameraSelector";
import { Statement } from "./statement";

export class V427 extends Class {
  __id = 427;
  __offset = 0x3e410;

  base = field(Statement);
  f_0x08 = field(CameraSelector);
  f_0x40 = field(BOOL);
  f_0x48 = field(U32);
  f_0x4c = field(AssetReference);
  f_0x44 = field(U32);
}
