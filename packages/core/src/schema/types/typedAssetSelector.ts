import { Class, field } from "../core";
import { Base } from "./base";

export class TypedAssetSelector extends Class {
  __id = 300;
  __metadata = false;

  base = field(Base);
}
