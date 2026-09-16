import type { GetProps } from "tamagui";

import type { ButtonFrame } from "./ButtonStyles";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

export type ButtonSize = "md" | "lg";

type ButtonFrameProps = Omit<
  GetProps<typeof ButtonFrame>,
  "children" | "variant" | "size" | "fullWidth" | "disabled"
>;

export interface ButtonProps extends ButtonFrameProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}
