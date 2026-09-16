import type { ReactNode } from "react";
import type { SvgProps } from "react-native-svg";

export interface SvgIconProps extends Omit<SvgProps, "width" | "height"> {
  size?: number;
  color?: string;
  filled?: boolean;
}

export interface SvgIconRenderProps {
  color: string;
  filled: boolean;
}

export type SvgIconRenderer = (props: SvgIconRenderProps) => ReactNode;
