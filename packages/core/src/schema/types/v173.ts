import { ClassCodec, field } from "../core";

import { AssetReference } from "./asset";
import { Base } from "./base";

export class V173 extends ClassCodec {
  __id = 173;

  base = field(Base);
  enumeration = field(AssetReference);
}
