import { ClassCodec, field } from "../core";

import { BOOL } from "./atomic";
import { Empty } from "./empty";
import { Texture } from "./texture";

export class V13 extends ClassCodec {
  __id = 13;

  base = field(Texture);
  f_0x48 = field(BOOL);
  empty = field(Empty);
}
