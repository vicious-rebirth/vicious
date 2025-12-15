import { Class, field } from "../core";

import { Object } from "./object";

export class LocalizedObject extends Class {
  __id = 5;

  base = field(Object);
}
