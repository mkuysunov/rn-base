export interface AppEnv {
  API_BASE_URL: string;
  BRAND_NAME: string;
}

const DEFAULT_ENV: AppEnv = {
  API_BASE_URL: "http://localhost:3000",
  BRAND_NAME: "RN Base",
};

export const getEnv = (): AppEnv => ({
  API_BASE_URL:
    process.env.EXPO_PUBLIC_API_BASE_URL ?? DEFAULT_ENV.API_BASE_URL,
  BRAND_NAME: process.env.EXPO_PUBLIC_BRAND_NAME ?? DEFAULT_ENV.BRAND_NAME,
});
