import { ClassCodec, Codec, MetadataCodec, deprecated, field } from "../core";

import { I32, U32, U16, U8, BOOL } from "./atomic";
import { U8Buffer } from "./buffer";
import { Label } from "./label";
import { Matrix3, Transform, TransformList, Vector3 } from "./math";
import { Mesh } from "./mesh";
import { V20_9 } from "./v20";

export class DynamicMesh extends ClassCodec {
  __id = 28;

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

export class DynamicMeshEntry extends Codec {
  version = field(U32, { skip: true });
  f_0x00 = field(U32);
  transform = field(Transform);
  matrix = field(Matrix3, {
    condition: (ctx) => ctx.gt(this.version, 3),
  });
  label = field(Label, {
    condition: (ctx) => ctx.gt(this.version, 3),
  });
  _ = field(U8, {
    deprecated: (ctx) => ctx.lte(this.version, 3),
  });
}

export class DynamicMeshEntries extends Codec {
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

export class DynamicMeshEntry2 extends Codec {
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

export class DynamicMeshEntries2 extends Codec {
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

export class DynamicMeshHelperPoint extends Codec {
  parentIndex = field(I32);
  transform = field(Transform);
  label = field(Label);
}

export class DynamicMeshHelperPointList extends Codec {
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

export class MeshRange extends Codec {
  vertexOffset = field(U16);
  vertexCount = field(U16);
  indexOffset = field(U32);
  indexCount = field(U16);
  helperPointIndex = field(U16);
}

export class SkinMeshFrame extends Codec {
  bufferCount = field(U32);
  f_2 = field(U32);
  buffer = field(U8Buffer, {
    condition: (ctx) => ctx.gt((ctx) => ctx.shl(this.bufferCount, 2), 0),
    custom: (ctx) => {
      ctx.set(this.buffer.size, (ctx) => ctx.shl(this.bufferCount, 3));

      ctx.walk();
    },
  });
}

export class MeshSection extends Codec {
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

export class DynamicMeshBody extends MetadataCodec {
  enabled = field(BOOL);
  meshSections = field((ctx) => ctx.array(MeshSection, 32), {
    condition: (ctx) => ctx.neq(this.enabled, 0),
    custom: (ctx) => {
      ctx.for(32, (ctx) => {
        ctx.walk((ctx) =>
          ctx.index(this.meshSections, (ctx) => ctx.iterator())
        );
      });
    },
  });
  riggedBufferCount = field(U32, {
    condition: (ctx) => ctx.neq(this.enabled, 0),
  });
  riggedVertexBuffer = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.neq(this.enabled, 0),
        (ctx) => ctx.gt((ctx) => ctx.shl(this.riggedBufferCount, 5), 0)
      ),
    custom: (ctx) => {
      ctx.set(this.riggedVertexBuffer.size, (ctx) =>
        ctx.shl(this.riggedBufferCount, 5)
      );

      ctx.walk();
    },
  });
  riggedJointWeightBuffer = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.neq(this.enabled, 0),
        (ctx) => ctx.gt((ctx) => ctx.shl(this.riggedBufferCount, 2), 0)
      ),
    custom: (ctx) => {
      ctx.set(this.riggedJointWeightBuffer.size, (ctx) =>
        ctx.shl(this.riggedBufferCount, 2)
      );

      ctx.walk(this.riggedJointWeightBuffer);
    },
  });
  staticVertexBufferCount = field(U32, {
    condition: (ctx) => ctx.neq(this.enabled, 0),
  });
  staticVertexBuffer = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.neq(this.enabled, 0),
        (ctx) => ctx.gt((ctx) => ctx.mul(this.staticVertexBufferCount, 16), 0)
      ),
    custom: (ctx) => {
      ctx.set(this.staticVertexBuffer.size, (ctx) =>
        ctx.mul(this.staticVertexBufferCount, 16)
      );

      ctx.walk();
    },
  });
  indexBufferCount = field(U32, {
    condition: (ctx) => ctx.neq(this.enabled, 0),
  });
  indexBuffer = field(U8Buffer, {
    condition: (ctx) =>
      ctx.and(
        (ctx) => ctx.neq(this.enabled, 0),
        (ctx) => ctx.gt((ctx) => ctx.mul(this.indexBufferCount, 2), 0)
      ),
    custom: (ctx) => {
      ctx.set(this.indexBuffer.size, (ctx) =>
        ctx.mul(this.indexBufferCount, 2)
      );

      ctx.walk();
    },
  });
}
