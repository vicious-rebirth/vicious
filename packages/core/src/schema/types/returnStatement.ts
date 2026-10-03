import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { Statement } from "./statement";

export class ReturnStatement extends Class {
  __id = 119;
  __offset = 0x24130;

  base = field(Statement);
  value = field(AssetFromType);
}
