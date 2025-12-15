import { Class, field } from "../core";

import { U32 } from "./atomic";
import { V428 } from "./v428";

export class V430 extends Class {
  __id = 430;
  __offset = 0x6dfa0;

  base = field(V428);
  f_0x38 = field(U32);
}
