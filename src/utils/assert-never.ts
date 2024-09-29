export default function assertNever(value: never) {
  throw new Error(`Unknown value: ${JSON.stringify(value)}`);
}
