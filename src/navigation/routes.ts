export const ROUTES = {
  AUTH: "Auth",
  MAIN: "Main",
  LOGIN: "Login",
  HOME: "Home",
  SETTINGS: "Settings",
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
