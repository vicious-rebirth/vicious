import { Class, field } from "../core";

import { AssetReference } from "./asset";
import { Base } from "./base";

export class V173 extends Class {
  __id = 173;

  base = field(Base);
  enumeration = field(AssetReference);
}
