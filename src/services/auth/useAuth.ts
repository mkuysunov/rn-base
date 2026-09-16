import { apiClient } from "@/config/apiClient";

export const useSendOtp = () => apiClient.useMutation("post", "/auth/send-otp");

export const useVerifyOtp = () =>
  apiClient.useMutation("post", "/auth/verify-otp");

export const useLogout = () => apiClient.useMutation("post", "/auth/logout");

export const useGetMe = (enabled = true) =>
  apiClient.useQuery("get", "/users/me", undefined, { enabled });
