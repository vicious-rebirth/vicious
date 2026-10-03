import { Class, field } from "../core";
import { AssetFromTypeWrap } from "./asset";
import { BOOL, U32 } from "./atomic";
import { EntitySelector } from "./entitySelector";
import { Label } from "./label";
import { PointSelector } from "./pointSelector";
import { ValueExpression } from "./valueExpression";

export class EntityDistanceExpression extends Class {
  __id = 229;
  __offset = 0x58ac0;

  base = field(ValueExpression);
  sourceEntity = field(EntitySelector);
  targetEntity = field(EntitySelector);
  targetPoint = field(PointSelector, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  targetMode = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  sourceHelper = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  targetHelper = field(Label, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  squared = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 2),
  });
  component = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 3),
  });
  localCoordinates = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 5),
  });
  sourceHelperIndex = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
  targetHelperIndex = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 6),
  });
}
