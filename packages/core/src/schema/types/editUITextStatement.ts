import { Class, field } from "../core";
import { AssetFromType, AssetFromTypeWrap } from "./asset";
import { U32 } from "./atomic";
import { FN_0x22520 } from "./fns";
import { Statement } from "./statement";

export class EditUITextStatement extends Class {
  __id = 372;
  __offset = 0x4a630;

  base = field(Statement);
  target = field(FN_0x22520);
  operation = field(U32);
  text = field(AssetFromType);
  position = field(AssetFromTypeWrap, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
}
