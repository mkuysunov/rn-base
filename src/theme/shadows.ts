export const shadows = {
  floating: "0 8px 28px rgba(46, 42, 77, 0.24)",
  hairline: "0 1px 2px rgba(46, 42, 77, 0.04)",
  focusRing: "0 0 0 3px rgba(148, 136, 198, 0.35)",
} as const;

export type ShadowToken = keyof typeof shadows;
