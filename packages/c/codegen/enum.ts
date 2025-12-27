import { EmptyEmit } from "@repo/core/backend";
import { Class } from "@repo/core/schema";
import { cg, getIDSortedClasses } from "@repo/core/util";

export function buildEnum(): string {
  return cg`
    typedef enum {
      ${buildEnumFields().join("\n")}
    } ViciousType;
  `;
}

export function buildEnumFields(): string[] {
  return getIDSortedClasses().map((definition) => {
    const decoder = new EnumEmit();

    decoder.visit(definition);

    return decoder.output;
  });
}

class EnumEmit extends EmptyEmit {
  protected emitClass(cls: Class, _fields: string): string {
    const name = cls.constructor.name;

    return cg`
      VCS_${name} = ${cls.__id},
    `;
  }
}
