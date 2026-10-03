import { Class, field } from "../core";
import { ListDataSource } from "./listDataSource";

export class V501 extends Class {
  __id = 501;
  __todo = true;
  __offset = 0x1be80;

  base = field(ListDataSource);
}
