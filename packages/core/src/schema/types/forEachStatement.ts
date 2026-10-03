import { Class, field } from "../core";
import { AssetFromType, AssetReference } from "./asset";
import { ExpressionList } from "./expression";
import { Statement } from "./statement";

export class ForEachStatement extends Class {
  __id = 420;
  __offset = 0x48380;

  base = field(Statement);
  source = field(AssetFromType);
  f_0x0c = field(AssetReference);
  body = field(ExpressionList);
}
