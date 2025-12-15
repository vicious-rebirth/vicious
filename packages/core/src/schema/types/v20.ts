import { Class, Struct, deprecated, field } from "../core";

import { I32, U32, I16, U16, U8, BOOL } from "./atomic";
import { U8Buffer, U16Buffer } from "./buffer";
import { Color, Vector3 } from "./math";
import { Mesh } from "./mesh";

export class V20 extends Class {
  __id = 20;
  __offset = 0x124b70;

  base = field(Mesh);
  _ = deprecated((ctx) => ctx.lte((ctx) => ctx.version(), 1));
  f_1 = field(V20_1);
  body = field(V20_5);
  enabled = field(BOOL);
  f_0x58 = field(V20_9, { condition: (ctx) => ctx.isTrue(this.enabled) });
}

export class V20_1 extends Struct {
  __offset = 0x122be0;

  count = field(I32);
  list = field((ctx) => ctx.list(V20_2), {
    condition: (ctx) => ctx.gt(this.count, 0),
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class V20_2 extends Struct {
  __offset = 0x11dbd0;

  f_0x00 = field(U32);
  f_0x04 = field(U32);
  f_0x08 = field(U32);
  f_0x0c = field(V20_3);
}

export class V20_3 extends Struct {
  __offset = 0x1154e0;

  count = field(U32);
  list = field((ctx) => ctx.list(V20_4), {
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class V20_4 extends Struct {
  __offset = 0x1154ff;

  f_1 = field(I16);
  f_2 = field(I16);
  f_3 = field(Vector3);
  f_4 = field(Vector3);
}

export class V20_6 extends Struct {
  __offset = 0x10b050;

  meshSections = field(V20_7);
  vertices = field(U8Buffer, {
    custom: (ctx) => {
      ctx.set(this.vertices.consume, true);
      ctx.walk();
    },
  });
  indices = field(U16Buffer, {
    custom: (ctx) => {
      ctx.set(this.indices.consume, true);
      ctx.walk();
    },
  });
}

export class V20_7 extends Struct {
  __offset = 0xf80e0;

  count = field(U32);
  list = field((ctx) => ctx.list(V20_8), {
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class V20_8 extends Struct {
  __offset = 0xf80ff;

  tint = field(Color);
  index = field(U16);
  material = field(U16);
}

export class V20_5 extends Struct {
  __metadata = true;
  __offset = 0x10b170;

  _ = deprecated((ctx) => ctx.eq((ctx) => ctx.version(), 0));
  enabled = field(BOOL);
  buffers = field(V20_6, {
    condition: (ctx) => ctx.isTrue(this.enabled),
  });
}

export class V20_9 extends Struct {
  __metadata = true;
  __offset = 0x181440;

  skip = field(BOOL, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.lt((ctx) => ctx.version(), 4),
        (ctx) => ctx.gt((ctx) => ctx.end(), 0)
      ),
    custom: (ctx) => {
      ctx.seek((ctx) => ctx.end());
    },
  });
  f_1 = field(V20_10, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  enabled = field(BOOL, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 4),
  });
  // TODO: Actually read data using clases instead of skipping over
  // f_2 = field(V20_11, {
  //   condition: (ctx) => ctx.isTrue(this.enabled),
  //   custom: (ctx) => {
  //     ctx.set(this.f_2.version, (ctx) => ctx.version());
  //     ctx.walk();
  //   },
  // });
  f_2 = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.isTrue(this.enabled),
        (ctx) => ctx.gt((ctx) => ctx.end(), 0)
      ),
    custom: (ctx) => {
      ctx.set(this.f_2.size, (ctx) =>
        ctx.sub(
          (ctx) => ctx.end(),
          (ctx) => ctx.tell()
        )
      );

      ctx.walk();
    },
  });
}

export class V20_10 extends Struct {
  __metadata = true;
  __offset = 0x17fc10;

  f_1 = field(U32);
}

export class V20_11 extends Struct {
  __offset = 0x1811b0;

  version = field(U8, { skip: true });
  f_0x10 = field(U32);
  f_0x18 = field(U32);
  f_0x00 = field(V20_12);
  f_0x04 = field(V20_14, {
    custom: (ctx) => {
      ctx.set(this.f_0x04.version, this.version);
      ctx.walk();
    },
  });
  f_0x0c = field(U32);
  list = field((ctx) => ctx.list(V20_11_1), {
    condition: (ctx) => ctx.gt(this.f_0x04.count, 0),
    custom: (ctx) => {
      ctx.allocate(this.list, this.f_0x04.count);

      ctx.for(this.f_0x04.count, (ctx) => {
        ctx.set(
          (ctx) => ctx.index(this.list, (ctx) => ctx.iterator()).version,
          this.version
        );

        ctx.set(
          (ctx) => ctx.index(this.list, (ctx) => ctx.iterator()).count1,
          (ctx) => ctx.index(this.f_0x04.list, (ctx) => ctx.iterator()).count1
        );

        ctx.set(
          ctx.index(this.list, (ctx) => ctx.iterator()).count2,
          (ctx) => ctx.index(this.f_0x04.list, (ctx) => ctx.iterator()).count2
        );

        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class V20_11_1 extends Struct {
  __offset = 0x18126f;

  version = field(U8, { skip: true });
  count1 = field(U8, { skip: true });
  count2 = field(U32, { skip: true });
  count3 = field(U32, { skip: true });
  list1 = field((ctx) => ctx.list(V20_11_2), {
    custom: (ctx) => {
      ctx.set(this.count3, 0);
      ctx.allocate(this.list1, this.count1);

      ctx.for(this.count1, (ctx) => {
        ctx.set(
          ctx.index(this.list1, (ctx) => ctx.iterator()).version,
          this.version
        );

        ctx.walk((ctx) => ctx.index(this.list1, (ctx) => ctx.iterator()));

        const value = ctx.var(
          U32,
          (ctx) => ctx.index(this.list1, (ctx) => ctx.iterator()).value
        );

        ctx.if(
          (ctx) => ctx.lt(this.count3, value),
          (ctx) => {
            ctx.set(this.count3, value);
          }
        );
      });
      ctx.set(this.count3, (ctx) => ctx.add(this.count3, 1));
    },
  });
  _ = deprecated((ctx) => ctx.eq(this.version, 1));
  list2 = field((ctx) => ctx.list(V20_11_3), {
    custom: (ctx) => {
      const size = ctx.var(U32, (ctx) =>
        ctx.band((ctx) => ctx.shr(this.count2, 27), 0b1111)
      );
      ctx.allocate(this.list2, size);

      ctx.for(size, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list2, (ctx) => ctx.iterator()));
      });
    },
  });
  list3 = field((ctx) => ctx.list(V20_11_3), {
    custom: (ctx) => {
      ctx.allocate(this.list3, this.count3);

      ctx.for(this.count3, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list3, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class V20_11_2 extends Struct {
  __offset = 0x1812cc;

  version = field(U8, { skip: true });
  acc = field(U16, { skip: true });
  f_1 = field(U16, {
    custom: (ctx) => {
      ctx.walk(this.f_1);

      ctx.set(this.acc, 0);
      ctx.set(this.acc, (ctx) =>
        ctx.xor(this.acc, (ctx) =>
          ctx.band((ctx) => ctx.xor(this.acc, this.f_1), 0b1)
        )
      );
    },
  });
  f_2 = field(U16, {
    condition: (ctx) => ctx.gt(this.version, 3),
    custom: (ctx) => {
      ctx.walk();

      ctx.set(this.acc, (ctx) =>
        ctx.xor(this.acc, (ctx) =>
          ctx.band(
            (ctx) => ctx.xor((ctx) => ctx.mul(this.f_2, 2), this.acc),
            0b10
          )
        )
      );
    },
  });
  f_3 = field(U16, {
    custom: (ctx) => {
      ctx.walk();

      ctx.set(this.acc, (ctx) =>
        ctx.xor(this.acc, (ctx) =>
          ctx.band(
            (ctx) => ctx.xor((ctx) => ctx.mul(this.f_3, 4), this.acc),
            0b11111100
          )
        )
      );
    },
  });
  f_4 = field(U16, {
    custom: (ctx) => {
      ctx.walk();

      ctx.set(this.acc, (ctx) =>
        ctx.bor(
          (ctx) => ctx.band(this.acc, 0b0000111111111111),
          (ctx) => ctx.shl(this.f_4, 12)
        )
      );
    },
  });
  f_5 = field(U16, {
    custom: (ctx) => {
      ctx.walk();

      ctx.set(this.acc, (ctx) =>
        ctx.xor(this.acc, (ctx) =>
          ctx.band(
            (ctx) => ctx.xor((ctx) => ctx.shl(this.f_5, 8), this.acc),
            0b0000111100000000
          )
        )
      );
    },
  });
  value = field(U16, {
    custom: (ctx) => {
      ctx.set(this.value, (ctx) =>
        ctx.shr((ctx) => ctx.band(this.acc, 0b0000111100000000), 8)
      );
    },
  });
}

export class V20_11_3 extends Struct {
  __offset = 0x1813de;

  f_1 = field((ctx) => ctx.array(U8, 6));
}

export class V20_12 extends Struct {
  __offset = 0x17f000;

  count = field(I32);
  list = field((ctx) => ctx.list(V20_13), {
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class V20_13 extends Struct {
  __offset = 0x181080;

  f_0x00 = field(U16);
  f_0x02 = field(U16);
  f_0x04 = field(Vector3);
  f_0x10 = field(Vector3);
}

export class V20_14 extends Struct {
  __offset = 0x17f450;

  version = field(U8, { skip: true });
  count = field(I32);
  list = field((ctx) => ctx.list(V20_15), {
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.set(
          ctx.index(this.list, (ctx) => ctx.iterator()).version,
          this.version
        );

        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class V20_15 extends Struct {
  __offset = 0x17fcc0;

  version = field(U8, { skip: true });
  f_1 = field(U8);
  count1 = field(U8);
  count2 = field(U32, { skip: true });
  f_2 = field(U32, {
    custom: (ctx) => {
      ctx.walk(this.f_2);
      ctx.set(this.count2, 0);
      ctx.set(this.count2, (ctx) =>
        ctx.band(
          (ctx) =>
            ctx.xor(this.count2, (ctx) =>
              ctx.xor((ctx) => ctx.shl(this.f_2, 27), this.count2)
            ),
          0b01111000000000000000000000000000
        )
      );
    },
  });
  _ = deprecated((ctx) => ctx.eq(this.version, 1));
  f_3 = field(U32, {
    custom: (ctx) => {
      ctx.walk(this.f_3);
      ctx.set(this.count2, (ctx) =>
        ctx.bor(
          (ctx) => ctx.band(this.count2, 0b01111111111111111111111111111111),
          (ctx) => ctx.shl(this.f_3, 31)
        )
      );
    },
  });
  f_4 = field(U32, {
    custom: (ctx) => {
      ctx.walk();
      ctx.set(this.count2, (ctx) =>
        ctx.band(
          (ctx) =>
            ctx.xor(this.count2, (ctx) => ctx.xor(this.count2, this.f_4)),
          0b00000111111111111111111111111111
        )
      );
    },
  });
  f_0x06 = field((ctx) => ctx.array(U8, 6));
  f_0x03 = field((ctx) => ctx.array(U8, 6));
}
