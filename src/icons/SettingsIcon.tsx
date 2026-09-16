import { Circle, Path } from "react-native-svg";

import { createSvgIcon } from "./SvgIconWrapper";

export const SettingsIcon = createSvgIcon("SettingsIcon", (props) => {
  const { color, filled } = props;
  const fill = filled ? color : "none";

  return (
    <>
      <Path
        d="M4 7h9M19 7h1M4 12h1M11 12h9M4 17h9M19 17h1"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <Circle
        cx={16}
        cy={7}
        r={2.2}
        stroke={color}
        strokeWidth={1.8}
        fill={fill}
      />
      <Circle
        cx={8}
        cy={12}
        r={2.2}
        stroke={color}
        strokeWidth={1.8}
        fill={fill}
      />
      <Circle
        cx={16}
        cy={17}
        r={2.2}
        stroke={color}
        strokeWidth={1.8}
        fill={fill}
      />
    </>
  );
});
