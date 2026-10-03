import { Class, field } from "../core";
import { F32, U32 } from "./atomic";
import { Base } from "./base";
import { Transform, Vector3 } from "./math";

export class BoundingVolume extends Class {
  __id = 56;
  __offset = 0x113f80;

  base = field(Base);
  f_0x04 = field(U32);
  f_0x08 = field(F32);
  scale = field(Vector3);
  transform = field(Transform);
}
