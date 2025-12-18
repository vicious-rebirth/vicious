import { Class, field } from "../core";
import { AssetFromTypeSizedList } from "./asset";
import { Base } from "./base";
import { V421 } from "./v421";

export class V339 extends Class {
  __id = 339;
  __offset = 0x21fd0;

  base = field(Base);
  f_0x04 = field(AssetFromTypeSizedList);
  v421 = field(V421);
}
