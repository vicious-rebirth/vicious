import { Class, MetadataCodec, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { Base } from "./base";

export class Expression extends Class {
  __id = 106;
  __metadata = false;

  base = field(Base);
}

export class ExpressionWrap extends MetadataCodec {
  base = field(Expression);
}

export class ExpressionList extends MetadataCodec {
  base = field(Expression);
  children = field(AssetFromTypeSizedList);
}
