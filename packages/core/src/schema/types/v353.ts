import { Class, field } from "../core";
import {
  AssetFromType,
  AssetFromTypeSizedList,
  AssetFromTypeWrap,
  AssetReference,
} from "./asset";
import { U32 } from "./atomic";
import { CameraSelector } from "./cameraSelector";
import { Script } from "./script";
import { Statement } from "./statement";

export class V353 extends Class {
  __id = 353;
  __offset = 0x4aa40;

  base = field(Statement);
  f_0x08 = field(U32);
  f_0x0c = field(U32);
  v166 = field(CameraSelector);
  f_0x48 = field(AssetReference);
  f_0x4c = field(AssetFromTypeWrap);
  onComplete = field(Script);
  f_0x6c = field(AssetFromType);
  f_0x70 = field(AssetFromTypeSizedList);
}
