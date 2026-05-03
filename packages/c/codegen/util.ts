import { EmptyEmit } from "@repo/core/backend";
import { Class } from "@repo/core/schema";
import { cg, getIDSortedClasses } from "@repo/core/util";

export function buildUtilImplementation() {
  return [buildClassFromID(), buildClassFolder(), buildClassExtension(), buildClassSize()].join(
    "\n\n"
  );
}

export function buildUtilDeclaration() {
  return [
    "const char *getClassName(U32 typeId);",
    "const char *getClassFolder(U32 typeId);",
    "const char *getClassExtension(U32 typeId);",
    "U32 getClassSize(U32 typeId);",
  ].join("\n");
}

function buildClassFromID() {
  return cg`
    const char *getClassName(U32 typeId) {
      switch (typeId) {
        ${getIDSortedClasses()
          .map((cls) => {
            const backend = new SwitchClassID();

            backend.visit(cls);

            return backend.output;
          })
          .join("\n")}
      }

      return "???";
    }
  `;
}

function buildClassFolder() {
  return cg`
    const char *getClassFolder(U32 typeId) {
      switch (typeId) {
        ${getIDSortedClasses()
          .map((cls) => {
            const backend = new SwitchClassFolder();

            backend.visit(cls);

            return backend.output;
          })
          .filter((v) => v)
          .join("\n")}
      }

      return 0;
    }
  `;
}

function buildClassExtension() {
  return cg`
    const char *getClassExtension(U32 typeId) {
      switch (typeId) {
        ${getIDSortedClasses()
          .map((cls) => {
            const backend = new SwitchClassExtension();

            backend.visit(cls);

            return backend.output;
          })
          .filter((v) => v)
          .join("\n")}
      }

      return 0;
    }
  `;
}

function buildClassSize() {
  return cg`
    U32 getClassSize(U32 typeId) {
      switch (typeId) {
        ${getIDSortedClasses()
          .map((cls) => {
            const backend = new SwitchClassSize();

            backend.visit(cls);

            return backend.output;
          })
          .filter((v) => v)
          .join("\n")}
      }

      return 0;
    }
  `;
}

class SwitchClassID extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`case ${cls.__id}: return "${cls.constructor.name}";`;
  }
}

class SwitchClassFolder extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    const folder = this.getClassFolder(cls);

    if (folder) {
      return cg`case ${cls.__id}: return "${folder}";`;
    }

    return "";
  }

  protected getClassFolder(cls: Class): string | null {
    if (cls.__folder) return cls.__folder;
    if (cls.base) return this.getClassFolder(new cls.base.__type());

    return null;
  }
}

class SwitchClassExtension extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    const folder = this.getClassExtension(cls);

    if (folder) {
      return cg`case ${cls.__id}: return "${folder}";`;
    }

    return "";
  }

  protected getClassExtension(cls: Class): string | null {
    if (cls.__ext) return cls.__ext;
    if (cls.base) return this.getClassExtension(new cls.base.__type());

    return null;
  }
}

class SwitchClassSize extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`case ${cls.__id}: return sizeof(${cls.constructor.name});`;
  }
}
