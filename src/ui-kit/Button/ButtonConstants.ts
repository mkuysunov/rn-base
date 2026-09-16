import { colors, semanticColors } from "@/theme/colors";
import type { TypographyTone } from "@/ui-kit/Typography";

import type { ButtonVariant } from "./ButtonTypes";

export const BUTTON_TITLE_TONE: Record<ButtonVariant, TypographyTone> = {
  primary: "inverse",
  secondary: "primary",
  danger: "inverse",
  ghost: "accent",
};

export const BUTTON_SPINNER_COLOR: Record<ButtonVariant, string> = {
  primary: colors.white,
  secondary: semanticColors.textPrimary,
  danger: colors.white,
  ghost: semanticColors.primaryStrong,
};
