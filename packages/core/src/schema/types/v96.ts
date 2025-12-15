import { ClassCodec, MetadataCodec, field } from "../core";

import { V19 } from "./v19";

export class V96 extends ClassCodec {
  __id = 96;

  base = field(V19);
  f_1 = field(V96_1);
}

export class V96_1 extends MetadataCodec {}
