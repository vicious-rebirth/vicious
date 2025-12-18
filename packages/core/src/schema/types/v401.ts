import { Class, field } from "../core";
import { GeomTemplate } from "./geomTemplate";

export class V401 extends Class {
  __id = 401;
  __todo = true;
  __offset = 0xefdb0;

  base = field(GeomTemplate);
}
