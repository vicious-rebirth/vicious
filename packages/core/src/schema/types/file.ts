import { Struct, field } from "../core";

import { ANY, U32 } from "./atomic";
import { ID } from "./id";
import { Label } from "./label";

export class AssetFileHeader extends Struct {
  __metadata = true;

  offset = field(U32, {
    custom: (ctx) => {
      ctx.walk();

      ctx.if(
        (ctx) => ctx.neq(this.offset, 0x20),
        (ctx) => ctx.error("bad file offset")
      );
    },
  });
  f_1 = field(U32);
  id = field(ID);
  label = field(Label);
  type = field(U32);
  f_2 = field(U32);
}

export class AssetFileContent extends Struct {
  __metadata = true;

  header = field(AssetFileHeader);
  object = field(ANY, {
    custom: (ctx) => {
      ctx.walkId(this.header.type, this.object);
    },
  });
}

export class AssetFile extends Struct {
  magicHeader = field(U32, {
    custom: (ctx) => {
      ctx.walk();

      ctx.if(
        (ctx) => ctx.neq(this.magicHeader, 0xfaaffaaf),
        (ctx) => ctx.error("bad file header")
      );
    },
  });
  version = field(U32);
  content = field(AssetFileContent);
  magicFooter = field(U32, {
    custom: (ctx) => {
      ctx.walk();
      ctx.if(
        (ctx) => ctx.neq(this.magicFooter, 0xfeeffeef),
        (ctx) => ctx.error("bad file footer")
      );
    },
  });
}
