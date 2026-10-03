import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { ExpressionList } from "./expression";
import { Statement } from "./statement";

export class WhileStatement extends Class {
  __id = 465;
  __offset = 0x4cf50;

  base = field(Statement);
  condition = field(AssetFromType);
  body = field(ExpressionList);
}
