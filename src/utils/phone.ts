import { PHONE_REGEX } from "./constants";

export const normalizePhone = (value: string) => value.replace(/[\s()-]/g, "");

export const isValidPhone = (value: string) =>
  PHONE_REGEX.test(normalizePhone(value));
