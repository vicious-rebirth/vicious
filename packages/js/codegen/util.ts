import { EmptyEmit } from "@repo/core/backend";
import { Class } from "@repo/core/schema";
import { cg, getIDSortedClasses } from "@repo/core/util";

export function buildUtils() {
  return [
    buildClassFromID(),
    buildIDFromClass(),
    buildClassFolder(),
    buildClassExtension(),
  ].join("\n\n");
}

function buildClassFromID() {
  return cg`
    export function getClassFromID(id: number): string {
      switch (id) {
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

function buildIDFromClass() {
  return cg`
    export function getIDFromClass(id: string): number {
      switch (id) {
        ${getIDSortedClasses()
          .map((cls) => {
            const backend = new SwitchIDClass();

            backend.visit(cls);

            return backend.output;
          })
          .join("\n")}
      }

      return -1;
    }
  `;
}

function buildClassFolder() {
  return cg`
    export function getClassFolder(cls: string): string | null {
      switch (cls) {
        ${getIDSortedClasses()
          .map((cls) => {
            const backend = new SwitchClassFolder();

            backend.visit(cls);

            return backend.output;
          })
          .filter((v) => v)
          .join("\n")}
      }

      return null;
    }
  `;
}

function buildClassExtension() {
  return cg`
    export function getClassExtension(cls: string): string | null {
      switch (cls) {
        ${getIDSortedClasses()
          .map((cls) => {
            const backend = new SwitchClassExtension();

            backend.visit(cls);

            return backend.output;
          })
          .filter((v) => v)
          .join("\n")}
      }

      return null;
    }
  `;
}

class SwitchClassID extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`case ${cls.__id}: return "${cls.constructor.name}";`;
  }
}

class SwitchIDClass extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    return cg`case "${cls.constructor.name}": return ${cls.__id};`;
  }
}

class SwitchClassFolder extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    const folder = this.getClassFolder(cls);

    if (folder) {
      return cg`case "${cls.constructor.name}": return "${folder}";`;
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
      return cg`case "${cls.constructor.name}": return "${folder}";`;
    }

    return "";
  }

  protected getClassExtension(cls: Class): string | null {
    if (cls.__ext) return cls.__ext;
    if (cls.base) return this.getClassExtension(new cls.base.__type());

    return null;
  }
}
