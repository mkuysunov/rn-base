import Svg from "react-native-svg";

import { semanticColors } from "@/theme/colors";

import type { SvgIconProps, SvgIconRenderer } from "./SvgIconWrapperTypes";

const DEFAULT_SIZE = 24;
const DEFAULT_VIEW_BOX = "0 0 24 24";

export const createSvgIcon = (
  displayName: string,
  render: SvgIconRenderer,
  viewBox = DEFAULT_VIEW_BOX
) => {
  const Icon = (props: SvgIconProps) => {
    const {
      size = DEFAULT_SIZE,
      color = semanticColors.textPrimary,
      filled = false,
      ...rest
    } = props;

    return (
      <Svg width={size} height={size} viewBox={viewBox} fill="none" {...rest}>
        {render({ color, filled })}
      </Svg>
    );
  };

  Icon.displayName = displayName;

  return Icon;
};
