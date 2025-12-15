import { ClassCodec, MetadataCodec, field } from "../core";

import { AssetFromTypeSizedList } from "./asset";
import { Base } from "./base";

export class Expression extends ClassCodec {
  __id = 106;

  base = field(Base);
}

export class ExpressionWrap extends MetadataCodec {
  base = field(Expression);
}

export class ExpressionList extends MetadataCodec {
  // TODO: Should be Expression
  base = field(Base);
  children = field(AssetFromTypeSizedList);
}
