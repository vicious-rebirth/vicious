import { ID } from "./generated";

function hex32(n: number): string {
  return (n >>> 0).toString(16).toUpperCase().padStart(8, "0");
}

export function idToString(id: ID): string {
  return hex32(id.low) + hex32(id.high);
}
