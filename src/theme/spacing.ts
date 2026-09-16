export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 64,
  "6xl": 80,
  "7xl": 112,
} as const;

export const layout = {
  gutter: 16,
  tabBarHeight: 72,
  touchMin: 44,
} as const;

export type SpacingToken = keyof typeof spacing;
