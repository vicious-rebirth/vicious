import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { CameraSelector } from "./cameraSelector";
import { EntitySelector } from "./entitySelector";
import { Label } from "./label";
import { ValueExpression } from "./valueExpression";

export class EntityScreenProjectionExpression extends Class {
  __id = 364;
  __offset = 0x59c70;

  base = field(ValueExpression);
  entity = field(EntitySelector);
  label = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  camera = field(CameraSelector);
  property = field(U32);
  predictionMode = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  predictionSpeed = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  f_0x8c = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  heightOffset = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
}
