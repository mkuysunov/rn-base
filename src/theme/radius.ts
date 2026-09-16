export const radius = {
  pill: 999,
  field: 16,
  card: 20,
  cardLarge: 24,
} as const;

export type RadiusToken = keyof typeof radius;
