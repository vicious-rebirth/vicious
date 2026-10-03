import { Class, field } from "../core";
import { AssetReferenceSizedList } from "./asset";
import { U32 } from "./atomic";
import { DynamicGeomTemplate } from "./dynamicGeomTemplate";

export class MaterialVolumeTemplate extends Class {
  __id = 91;
  __offset = 0x10dad0;

  base = field(DynamicGeomTemplate);
  f_0x44 = field(AssetReferenceSizedList);
  f_0x48 = field(U32);
}
