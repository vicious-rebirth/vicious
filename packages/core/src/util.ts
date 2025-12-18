import { EmptyEmit } from "./backend";
import { Atom, Class, Definition, Struct } from "./schema/core";
import * as schema from "./schema/types";

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

export function getDependencySortedDefinitions(): Definition[] {
  const definitions = getDefinitions();

  class DependencyVisit extends EmptyEmit {
    public readonly dependencies = new Set<string>();

    protected emitType(type: string): string {
      this.dependencies.add(type);

      return "";
    }
  }

  const definitionDependencies = Object.fromEntries(
    definitions.map((d) => {
      const backend = new DependencyVisit();
      backend.visit(d);
      return [
        d.constructor.name,
        {
          obj: d,
          dependencies: new Set([
            ...backend.dependencies,
            ...((d as any)?.__metadata ? ["Metadata"] : []),
          ]),
        },
      ];
    })
  );

  const dependencyTree: Record<string, string[]> = {};
  for (const [name, { dependencies }] of Object.entries(
    definitionDependencies
  )) {
    if (dependencies.size === 0) {
      dependencyTree["_"] = [...(dependencyTree["_"] || []), name];
    } else {
      for (const dependency of dependencies) {
        dependencyTree[dependency] = [
          ...(dependencyTree[dependency] || []),
          name,
        ];
      }
    }
  }

  const sortedDependencyTree = Object.fromEntries(
    Object.entries(dependencyTree).map(([k, vs]) => [k, vs.sort()])
  );

  const queue = sortedDependencyTree["_"]!;

  const out: Definition[] = [];
  while (true) {
    const next = queue.shift();
    if (!next) break;

    out.push(definitionDependencies[next]!.obj);

    for (const dependency of sortedDependencyTree[next] || []) {
      const set = definitionDependencies[dependency]!.dependencies;
      set.delete(next);

      if (set.size === 0) queue.push(dependency);
    }
  }

  return out;
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
