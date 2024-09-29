export default function assertNever(value: never): never {
  throw new Error(`Unknown value: ${JSON.stringify(value)}`);
}
