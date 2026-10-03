import { Class, field } from "../core";
import { AssetFromType } from "./asset";
import { U32 } from "./atomic";
import { Statement } from "./statement";

export class AssignValueStatement extends Class {
  __id = 120;
  __offset = 0x247f0;

  base = field(Statement);
  operation = field(U32);
  destination = field(AssetFromType);
  source = field(AssetFromType);
}
