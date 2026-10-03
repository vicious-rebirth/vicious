import { Class, field } from "../core";
import { U32 } from "./atomic";
import { ValueExpression } from "./valueExpression";

export class FileSystemStatusExpression extends Class {
  __id = 449;
  __offset = 0x341b0;

  base = field(ValueExpression);
  property = field(U32, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
  });
  expectedErrorCode = field(U32);
}
