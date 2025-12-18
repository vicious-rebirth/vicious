import { Class, Struct, deprecated, field } from "../core";
import { BOOL, I32, U8, U16, U32 } from "./atomic";
import { U8Buffer } from "./buffer";
import { Label } from "./label";
import { Matrix3, Transform, TransformList, Vector3 } from "./math";
import { Mesh } from "./mesh";
import { V20_9 } from "./v20";

export class DynamicMesh extends Class {
  __id = 28;
  __offset = 0x11e0c0;

  base = field(Mesh);
  viewBox = field(Vector3);
  meshDeform = field(U16);
  f_0x52 = field(U16);
  f_0x54 = field(U16);
  f_0x56 = field(U16);
  f_0x58 = field(U16);
  helperPoints = field(DynamicMeshHelperPointList);
  transforms = field(TransformList);
  hitBox = field(DynamicMeshEntries, {
    custom: (ctx) => {
      ctx.set(this.hitBox.version, (ctx) => ctx.version());
      ctx.walk(this.hitBox);
    },
  });
  hitBox2 = field(DynamicMeshEntries2, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 1),
    custom: (ctx) => {
      ctx.set(this.hitBox2.version, (ctx) => ctx.version());
      ctx.walk(this.hitBox2);
    },
  });
  _ = deprecated((ctx) => ctx.lt((ctx) => ctx.version(), 3));
  f_0x7c = field(U32, {
    condition: (ctx) => ctx.gte((ctx) => ctx.version(), 3),
  });
  f_0x80 = field((ctx) => ctx.list(Vector3), {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gte((ctx) => ctx.version(), 3),
        (ctx) => ctx.gt(this.f_0x7c, 0)
      ),
    custom: (ctx) => {
      ctx.allocate(this.f_0x80, this.f_0x7c);

      ctx.for(this.f_0x7c, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.f_0x80, (ctx) => ctx.iterator()));
      });
    },
  });
  f_0x84 = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gte((ctx) => ctx.version(), 3),
        (ctx) => ctx.gt(this.f_0x7c, 0)
      ),
    custom: (ctx) => {
      ctx.set(this.f_0x84.consume, false);
      ctx.set(this.f_0x84.size, (ctx) => ctx.mul(this.f_0x7c, 4));
      ctx.walk(this.f_0x84);
    },
  });
  f_0x90e = field(BOOL, {
    condition: (ctx) => ctx.gt((ctx) => ctx.version(), 4),
  });
  f_0x90 = field(V20_9, {
    condition: (ctx) =>
      ctx.and((ctx) => ctx.gt((ctx) => ctx.version(), 4), this.f_0x90e),
  });
  body = field(DynamicMeshBody);
}

export class DynamicMeshEntry extends Struct {
  __offset = 0x10dc20;

  version = field(U32, { skip: true });
  f_0x00 = field(U32);
  transform = field(Transform);
  matrix = field(Matrix3, {
    condition: (ctx) => ctx.gt(this.version, 3),
  });
  label = field(Label, {
    condition: (ctx) => ctx.gt(this.version, 3),
  });
  _ = deprecated((ctx) => ctx.lte(this.version, 3));
}

export class DynamicMeshEntries extends Struct {
  __offset = 0x75940;

  version = field(U32, { skip: true });
  count = field(U32);
  list = field((ctx) => ctx.list(DynamicMeshEntry), {
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

export class DynamicMeshEntry2 extends Struct {
  __offset = 0x10ddd0;

  version = field(U32, { skip: true });
  f_0x00 = field(U32);
  transform = field(Transform);
  vector = field(Vector3);
  f_0x40 = field(U16);
  f_0x42 = field(U16);
  f_0x44 = field(V20_9, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.gt(this.version, 5),
        (ctx) => ctx.eq(this.f_0x40, 3)
      ),
  });
}

export class DynamicMeshEntries2 extends Struct {
  __offset = 0x759c0;

  version = field(U32, { skip: true });
  count = field(U32);
  list = field((ctx) => ctx.list(DynamicMeshEntry2), {
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

export class DynamicMeshHelperPoint extends Struct {
  __offset = 0x10db60;

  parentIndex = field(I32);
  transform = field(Transform);
  label = field(Label);
}

export class DynamicMeshHelperPointList extends Struct {
  __offset = 0x758d0;

  count = field(U32);
  list = field((ctx) => ctx.list(DynamicMeshHelperPoint), {
    custom: (ctx) => {
      ctx.allocate(this.list, this.count);

      ctx.for(this.count, (ctx) => {
        ctx.walk((ctx) => ctx.index(this.list, (ctx) => ctx.iterator()));
      });
    },
  });
}

export class MeshRange extends Struct {
  __offset = 0xf7ff0;

  vertexOffset = field(U16);
  vertexCount = field(U16);
  indexOffset = field(U32);
  indexCount = field(U16);
  helperPointIndex = field(U16);
}

export class SkinMeshFrame extends Struct {
  __offset = 0xf8060;

  bufferCount = field(U32);
  f_2 = field(U32);
  buffer = field(U8Buffer, {
    condition: (ctx) => ctx.gt((ctx) => ctx.shl(this.bufferCount, 2), 0),
    custom: (ctx) => {
      ctx.set(this.buffer.consume, false);
      ctx.set(this.buffer.size, (ctx) => ctx.shl(this.bufferCount, 3));

      ctx.walk();
    },
  });
}

export class MeshSection extends Struct {
  __offset = 0x10a2b6;

  riggedRangeCount = field(U8);
  riggedRanges = field((ctx) => ctx.list(MeshRange), {
    custom: (ctx) => {
      ctx.allocate(this.riggedRanges, this.riggedRangeCount);

      ctx.for(this.riggedRangeCount, (ctx) => {
        ctx.walk((ctx) =>
          ctx.index(this.riggedRanges, (ctx) => ctx.iterator())
        );
      });
    },
  });
  staticRangeCount = field(U8);
  staticRanges = field((ctx) => ctx.list(MeshRange), {
    custom: (ctx) => {
      ctx.allocate(this.staticRanges, this.staticRangeCount);

      ctx.for(this.staticRangeCount, (ctx) => {
        ctx.walk((ctx) =>
          ctx.index(this.staticRanges, (ctx) => ctx.iterator())
        );
      });
    },
  });
  animationFrameCount = field(U8);
  animationFrames = field((ctx) => ctx.list(SkinMeshFrame), {
    custom: (ctx) => {
      ctx.allocate(this.animationFrames, this.animationFrameCount);

      ctx.for(this.animationFrameCount, (ctx) => {
        ctx.walk((ctx) =>
          ctx.index(this.animationFrames, (ctx) => ctx.iterator())
        );
      });
    },
  });
}

export class DynamicMeshBody extends Struct {
  __metadata = true;
  __offset = 0x10a500;

  enabled = field(BOOL);
  meshSections = field((ctx) => ctx.array(MeshSection, 32), {
    condition: (ctx) => ctx.isTrue(this.enabled),
    custom: (ctx) => {
      ctx.for(32, (ctx) => {
        ctx.walk((ctx) =>
          ctx.index(this.meshSections, (ctx) => ctx.iterator())
        );
      });
    },
  });
  riggedBufferCount = field(U32, {
    condition: (ctx) => ctx.isTrue(this.enabled),
  });
  riggedVertexBuffer = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.isTrue(this.enabled),
        (ctx) => ctx.gt((ctx) => ctx.shl(this.riggedBufferCount, 5), 0)
      ),
    custom: (ctx) => {
      ctx.set(this.riggedVertexBuffer.consume, false);
      ctx.set(this.riggedVertexBuffer.size, (ctx) =>
        ctx.shl(this.riggedBufferCount, 5)
      );

      ctx.walk();
    },
  });
  riggedJointWeightBuffer = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.isTrue(this.enabled),
        (ctx) => ctx.gt((ctx) => ctx.shl(this.riggedBufferCount, 2), 0)
      ),
    custom: (ctx) => {
      ctx.set(this.riggedJointWeightBuffer.consume, false);
      ctx.set(this.riggedJointWeightBuffer.size, (ctx) =>
        ctx.shl(this.riggedBufferCount, 2)
      );

      ctx.walk(this.riggedJointWeightBuffer);
    },
  });
  staticVertexBufferCount = field(U32, {
    condition: (ctx) => ctx.isTrue(this.enabled),
  });
  staticVertexBuffer = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.isTrue(this.enabled),
        (ctx) => ctx.gt((ctx) => ctx.mul(this.staticVertexBufferCount, 16), 0)
      ),
    custom: (ctx) => {
      ctx.set(this.staticVertexBuffer.consume, false);
      ctx.set(this.staticVertexBuffer.size, (ctx) =>
        ctx.mul(this.staticVertexBufferCount, 16)
      );

      ctx.walk();
    },
  });
  indexBufferCount = field(U32, {
    condition: (ctx) => ctx.isTrue(this.enabled),
  });
  indexBuffer = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.isTrue(this.enabled),
        (ctx) => ctx.gt((ctx) => ctx.mul(this.indexBufferCount, 2), 0)
      ),
    custom: (ctx) => {
      ctx.set(this.indexBuffer.consume, false);
      ctx.set(this.indexBuffer.size, (ctx) =>
        ctx.mul(this.indexBufferCount, 2)
      );

      ctx.walk();
    },
  });
}
