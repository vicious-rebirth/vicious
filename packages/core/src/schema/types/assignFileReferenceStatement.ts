import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { Statement } from "./statement";

export class AssignFileReferenceStatement extends Class {
  __id = 312;
  __offset = 0x245e0;

  base = field(Statement);
  destination = field(AssetFromType);
  source = field(AssetFromType);
}
