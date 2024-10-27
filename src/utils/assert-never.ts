/**
 * @example
 * ```ts
 * type Type = "morning" | "night";
 *
 * function greet(name: string, type: Type) {
 *   if (type === "morning") {
 *     return `Good morning ${name}`;
 *   }
 *
 *   if (type === "night") {
 *     return `Good evening ${name}`;
 *   }
 *
 *   // (parameter) type: never
 *   return assertNever(type);
 * }
 * ```
 */
export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}
