import { CodeContext, Struct, field } from "../core";
import { U32 } from "./atomic";

export class Metadata extends Struct {
  header = field(MetadataHeader);
  footer = field(MetadataFooter);
}

function alignTo4Byte(ctx: CodeContext): void {
  const offset = ctx.var(U32, (ctx) => ctx.tell());
  const align = ctx.var(U32, (ctx) =>
    ctx.shl((ctx) => ctx.shr((ctx) => ctx.add(offset, 3), 2), 2)
  );
  ctx.if(
    (ctx) => ctx.neq(offset, align),
    (ctx) => ctx.seek(align)
  );
}

export class MetadataHeader extends Struct {
  __offset = 0xc83d0;

  magic = field(U32, {
    custom: (ctx) => {
      alignTo4Byte(ctx);

      ctx.walk();

      ctx.if(
        (ctx) => ctx.neq(this.magic, 0xbbbbbbbb),
        (ctx) => ctx.error("bad header magic")
      );
    },
  });
  end = field(U32);
  version = field(U32, {
    custom: (ctx) => {
      ctx.walk();

      ctx.if(
        (ctx) => ctx.lte(this.version, 0),
        (ctx) => ctx.error("bad version")
      );
    },
  });
}

export class MetadataFooter extends Struct {
  __offset = 0xc8450;

  magic = field(U32, {
    custom: (ctx) => {
      alignTo4Byte(ctx);

      ctx.walk();

      ctx.if(
        (ctx) => ctx.neq(this.magic, 0xbebebebe),
        (ctx) => ctx.error("bad footer magic")
      );
    },
  });
}
