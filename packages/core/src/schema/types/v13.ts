import { Class, field } from "../core";
import { BOOL } from "./atomic";
import { Empty } from "./empty";
import { Texture } from "./texture";

export class V13 extends Class {
  __id = 13;
  __offset = 0x104180;

  base = field(Texture);
  f_0x48 = field(BOOL);
  empty = field(Empty, { offset: 0xf5bb0 });
}
