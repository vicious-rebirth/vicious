import { Class, deprecated, field } from "../core";
import { AssetFromType } from "./asset";
import { Statement } from "./statement";

export class AssignStringStatement extends Class {
  __id = 384;
  __offset = 0x24660;

  base = field(Statement);
  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  destination = field(AssetFromType);
  source = field(AssetFromType);
}
