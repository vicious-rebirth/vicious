import { Class, field } from "../core";
import { U32 } from "./atomic";
import { ListDataSource } from "./listDataSource";

export class NumericListDataSource extends Class {
  __id = 515;
  __offset = 0x507c0;

  base = field(ListDataSource);
  valueCount = field(U32);
}
