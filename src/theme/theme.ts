import { colors, semanticColors } from "./colors";
import { motion } from "./motion";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { layout, spacing } from "./spacing";
import { fontFamily, fontSizes, fontWeights, lineHeights } from "./typography";

export const theme = {
  colors,
  semantic: semanticColors,
  fontFamily,
  fontWeights,
  fontSizes,
  lineHeights,
  spacing,
  layout,
  radius,
  shadows,
  motion,
} as const;

export type Theme = typeof theme;
