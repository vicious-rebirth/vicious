import { Class, field } from "../core";
import { Group } from "./group";

export class LensFlareGroup extends Class {
  __id = 412;
  __offset = 0x1a330;

  base = field(Group);
}
