import type { GetProps } from "tamagui";

import type { Typography } from "./Typography";

export type TypographyProps = GetProps<typeof Typography>;

export type TypographyVariant = NonNullable<TypographyProps["variant"]>;
export type TypographyTone = NonNullable<TypographyProps["tone"]>;
export type TypographyAlign = NonNullable<TypographyProps["align"]>;
