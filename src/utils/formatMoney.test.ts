import { formatMoney } from "./formatMoney";

describe("formatMoney", () => {
  it("groups thousands with a non-breaking space and appends the currency", () => {
    expect(formatMoney(165000)).toBe("165 000 UZS");
  });

  it("keeps small amounts ungrouped", () => {
    expect(formatMoney(999)).toBe("999 UZS");
  });

  it("supports negative amounts and a custom currency", () => {
    expect(formatMoney(-1234567, "USD")).toBe("-1 234 567 USD");
  });
});
