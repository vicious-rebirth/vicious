export abstract class Definition {
  __offset: number | undefined = undefined;
  __todo: boolean | undefined = undefined;
  __doc: string | undefined = undefined;
}

type FixedArray<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : FixedArray<T, N, [...R, T]>;

export type TypeContext = {
  array: <T extends Definition, K extends number>(
    type: new (...args: any[]) => T,
    count: K
  ) => FixedArray<T, K>;
  list: <T extends Definition>(
    type: new (...args: any[]) => T,
    maxCount?: number
  ) => T[];
};

export type Type<T = any> =
  | ((ctx: TypeContext) => T)
  | (new (...args: any[]) => T);
export type Value =
  | Definition
  | number
  | string
  | boolean
  | ((ctx: CodeContext) => any);
export type Op2 = (left: Value, right: Value) => Definition;

export type CodeContext = {
  if: (
    condition: (ctx: CodeContext) => void,
    true_: (ctx: CodeContext) => void,
    false_?: (ctx: CodeContext) => void
  ) => void;

  for: (
    size: Definition | number | ((ctx: CodeContext) => void),
    body: (ctx: CodeContext) => void
  ) => void;
  loop: (body: (ctx: CodeContext) => void) => void;
  iterator: () => number;
  break: () => void;

  var: <T>(type: Type<T>, data: Value) => T;

  not: (value: Value) => Definition;
  add: Op2;
  sub: Op2;
  mul: Op2;
  div: Op2;
  shl: Op2;
  shr: Op2;

  band: Op2;
  bor: Op2;
  xor: Op2;

  eq: Op2;
  neq: Op2;
  lt: Op2;
  lte: Op2;
  gt: Op2;
  gte: Op2;
  and: Op2;
  or: Op2;

  version: () => number;
  end: () => number;

  index: <T extends Definition | number | string>(
    target: T[],
    value: Value
  ) => T;

  set: (target: Value, value: Value) => void;
  allocate: <T extends Definition | number | string>(
    target: T[],
    count: Value
  ) => void;

  forward: (target: Value, size: Value) => void;
  seek: (offset: Value) => void;
  tell: () => void;

  walk: (target?: Value) => void;

  getId: (id: Value) => Definition;
  setId: (id: Value, target: Value) => void;
  walkId: (id: Value, target?: Value) => void;

  error: (message: string) => void;
  todo: (message: string) => void;
};

export type FieldProps = {
  name?: string;
  skip?: boolean;
  todo?: boolean;
  deprecated?: (ctx: CodeContext) => void;
  condition?: (ctx: CodeContext) => void;
  custom?: (ctx: CodeContext) => void;
};

export class FieldReference<T = any> {
  public name: string = "";

  public constructor(
    public type: Type<T>,
    public props?: FieldProps
  ) {}
}

export class VariableReference<T = any> {
  public constructor(
    public name: string,
    public type: Type<T>
  ) {}
}

export function field<T>(type: Type<T>, props?: FieldProps): T {
  const field = new FieldReference(type, props);

  return field as T;
}

export function deprecated(condition: (ctx: CodeContext) => void): undefined {
  return field(null as any, { condition }) as any as undefined;
}

export abstract class Atom extends Definition {}

export abstract class Struct extends Definition {
  __metadata: boolean = false;
}

export abstract class MetadataCodec extends Definition {
  __metadata: boolean = true;
}

export abstract class Class<T = any> extends Definition {
  abstract get __id(): number;
  __folder: string | undefined = undefined;
  __ext: string | undefined = undefined;
  __metadata: boolean = true;

  abstract get base(): T;
}
