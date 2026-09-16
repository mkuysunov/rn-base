import type { PropsWithChildren } from "react";
import type { Edge } from "react-native-safe-area-context";
import type { YStackProps } from "tamagui";

export type ScreenBackground = "default" | "surface";

export interface ScreenProps extends PropsWithChildren {
  scroll?: boolean;
  padded?: boolean;
  edges?: readonly Edge[];
  background?: ScreenBackground;
  contentProps?: YStackProps;
}
