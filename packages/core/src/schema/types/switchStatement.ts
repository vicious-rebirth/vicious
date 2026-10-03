import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { ExpressionList } from "./expression";
import { Statement } from "./statement";

export class SwitchStatement extends Class {
  __id = 214;
  __offset = 0x47470;

  base = field(Statement);
  target = field(AssetFromType);
  cases = field(ExpressionList);
  defaultBody = field(ExpressionList);
}
