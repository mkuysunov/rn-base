import { Path } from "react-native-svg";

import { createSvgIcon } from "./SvgIconWrapper";

export const HomeIcon = createSvgIcon("HomeIcon", (props) => {
  const { color, filled } = props;

  return (
    <Path
      d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinejoin="round"
      fill={filled ? color : "none"}
    />
  );
});
