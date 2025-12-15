import * as schema from "./schema/types";
import { Definition, Class, Atom, Struct } from "./schema/core";

export function cg(strings: TemplateStringsArray, ...values: unknown[]) {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];

    if (i < values.length) {
      const indent = strings[i]!.match(/(?:^|\n)([ \t]*)[^\n]*$/)?.[1] ?? "";
      const value = String(values[i]).replace(/\n/g, "\n" + indent);

      result += value;
    }
  }

  const lines = result.split("\n");
  while (lines.length && !lines[0]?.trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1]?.trim()) lines.pop();

  const minIndent = lines
    .filter((l) => l.trim())
    .reduce((min, line) => {
      const indent = line.match(/^[ \t]*/)![0].length;
      return Math.min(min, indent);
    }, Infinity);

  return lines.map((line) => line.slice(minIndent)).join("\n");
}

export function getDefinitions(): Definition[] {
  const out: Definition[] = [];

  for (const obj of Object.values(schema)) {
    if (typeof obj !== "function") continue;

    const parent = (obj as any)?.prototype;
    if (
      parent instanceof Atom ||
      parent instanceof Class ||
      parent instanceof Struct
    ) {
      out.push(new (obj as any)());
    }
  }

  return out;
}

export function getNameSortedDefinitions(): Definition[] {
  return getDefinitions().sort((a, b) =>
    a.constructor.name.localeCompare(b.constructor.name)
  );
}

export function getIDSortedClasses(): Class[] {
  return getDefinitions()
    .filter((d) => d instanceof Class)
    .sort((a, b) => a.__id - b.__id);
}

export function getNameSortedAtoms(): Atom[] {
  return getDefinitions()
    .filter((d) => d instanceof Atom)
    .sort((a, b) => a.constructor.name.localeCompare(b.constructor.name));
}
