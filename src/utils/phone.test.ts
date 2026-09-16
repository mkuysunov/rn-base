import { isValidPhone, normalizePhone } from "./phone";

describe("phone utils", () => {
  it("strips spaces, dashes and parentheses", () => {
    expect(normalizePhone("+998 (90) 123-45-67")).toBe("+998901234567");
  });

  it("accepts international numbers", () => {
    expect(isValidPhone("+998 90 123 45 67")).toBe(true);
    expect(isValidPhone("998901234567")).toBe(true);
  });

  it("rejects short or malformed numbers", () => {
    expect(isValidPhone("12345")).toBe(false);
    expect(isValidPhone("+0123456789")).toBe(false);
    expect(isValidPhone("phone")).toBe(false);
  });
});
