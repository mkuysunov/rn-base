import { Spinner } from "tamagui";

import { Typography } from "@/ui-kit/Typography";

import { BUTTON_SPINNER_COLOR, BUTTON_TITLE_TONE } from "./ButtonConstants";
import { ButtonFrame } from "./ButtonStyles";
import type { ButtonProps } from "./ButtonTypes";

export const Button = (props: ButtonProps) => {
  const {
    title,
    variant = "primary",
    size = "lg",
    loading = false,
    fullWidth = false,
    disabled = false,
    onPress,
    ...rest
  } = props;

  const isDisabled = disabled || loading;

  return (
    <ButtonFrame
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      {...rest}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={isDisabled}
      onPress={isDisabled ? undefined : onPress}
    >
      {loading ? (
        <Spinner size="small" color={BUTTON_SPINNER_COLOR[variant]} />
      ) : (
        <Typography variant="button" tone={BUTTON_TITLE_TONE[variant]}>
          {title}
        </Typography>
      )}
    </ButtonFrame>
  );
};
