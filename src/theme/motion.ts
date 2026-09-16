import { Easing } from "react-native";

export const motion = {
  duration: {
    press: 120,
    select: 200,
    screen: 320,
  },
  pressScale: 0.97,
  easing: Easing.bezier(0.4, 0, 0.2, 1),
} as const;
