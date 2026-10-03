import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { CameraSelector } from "./cameraSelector";
import { Statement } from "./statement";

export class V416 extends Class {
  __id = 416;
  __offset = 0x3ea00;

  base = field(Statement);
  v166 = field(CameraSelector);
  f_0x40 = field(AssetFromTypeWrap);
  f_0x44 = field(AssetFromTypeWrap);
}
