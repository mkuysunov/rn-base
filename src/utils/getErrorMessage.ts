const hasMessage = (value: unknown): value is { message: string } =>
  typeof value === "object" &&
  value !== null &&
  "message" in value &&
  typeof (value as { message: unknown }).message === "string";

export const getErrorMessage = (error: unknown, fallback: string) =>
  hasMessage(error) && error.message.length > 0 ? error.message : fallback;
