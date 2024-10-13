/**
 * @example
 * ```ts
 * type Pattern = "bowwow" | "meow";
 *
 * function getAnimal(pattern: Pattern) {
 *   switch (pattern) {
 *     case "bowwow":
 *       return "Dog";
 *     case "meow":
 *       return "Cat";
 *     default:
 *       // (parameter) pattern: never
 *       return assertNever(pattern);
 *   }
 * }
 * ```
 */
export default function assertNever(value: never): never {
  throw new Error(`Unknown value: ${JSON.stringify(value)}`);
}
