import { Class, Struct, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { Base } from "./base";

export class Expression extends Class {
  __id = 106;
  __metadata = false;

  base = field(Base);
}

export class ExpressionWrap extends Struct {
  __metadata = true;

  base = field(Expression);
}

export class ExpressionList extends Struct {
  __metadata = true;

  base = field(Expression);
  children = field(AssetFromTypeSizedList);
}
