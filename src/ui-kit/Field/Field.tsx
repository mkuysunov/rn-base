import { YStack } from "tamagui";

import { Typography } from "@/ui-kit/Typography";

import { FieldInput } from "./FieldStyles";
import type { FieldProps } from "./FieldTypes";

export const Field = (props: FieldProps) => {
  const { label, helper, error, ...rest } = props;
  const message = error ?? helper;

  return (
    <YStack gap="$2">
      {label ? (
        <Typography variant="small" tone="secondary">
          {label}
        </Typography>
      ) : null}
      <FieldInput {...rest} invalid={Boolean(error)} />
      {message ? (
        <Typography variant="small" tone={error ? "danger" : "secondary"}>
          {message}
        </Typography>
      ) : null}
    </YStack>
  );
};
