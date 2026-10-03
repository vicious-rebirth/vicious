import { Class, field } from "../core";
import { U32 } from "./atomic";
import { Base } from "./base";
import { EntitySelector } from "./entitySelector";

export class CameraSelector extends Class {
  __id = 166;
  __offset = 0x21bb0;

  base = field(Base);
  mode = field(U32);
  entity = field(EntitySelector);
}
