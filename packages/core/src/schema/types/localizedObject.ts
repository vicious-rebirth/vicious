import { ClassCodec, field } from "../core";

import { Object } from "./object";

export class LocalizedObject extends ClassCodec {
  __id = 5;

  base = field(Object);
}
