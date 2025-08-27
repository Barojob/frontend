import type { Maybe } from "@/types/misc";

export function assert(
  condition: Maybe<boolean> | (() => boolean),
  message: Error | Response | string = "Assertion failed",
): asserts condition {
  if (typeof condition === "function" ? condition() : condition) {
    return;
  }

  if (message instanceof Error || message instanceof Response) {
    throw message;
  }

  throw new AssertionError(message);
}

class AssertionError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "AssertionError";
  }
}

export function ensure<T>(value: T, message: string = "Assertion failed"): T {
  assert(!!value, message);
  return value;
}
