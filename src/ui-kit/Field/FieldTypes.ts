import type { GetProps } from "tamagui";

import type { FieldInput } from "./FieldStyles";

type FieldInputProps = Omit<GetProps<typeof FieldInput>, "invalid">;

export interface FieldProps extends FieldInputProps {
  label?: string;
  helper?: string;
  error?: string;
}
