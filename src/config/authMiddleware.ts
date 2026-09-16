import type { Client, Middleware } from "openapi-fetch";

import type { AuthTokens } from "@/services/auth/authTypes";
import type { paths } from "@/services/schema/api-schema";
import { useSessionStore } from "@/store/sessionStore";

const AUTH_PATH_PREFIX = "/auth/";

const applyAuthHeaders = (request: Request, language: string) => {
  const { accessToken } = useSessionStore.getState();

  request.headers.set("Accept-Language", language);

  if (accessToken) {
    request.headers.set("Authorization", `Bearer ${accessToken}`);
  }
};

export const createAuthMiddleware = (
  client: Client<paths>,
  getLanguage: () => string
): Middleware => {
  const pendingRequests = new Map<string, Request>();
  let refreshPromise: Promise<AuthTokens | null> | null = null;

  const refreshTokens = async (): Promise<AuthTokens | null> => {
    const { refreshToken } = useSessionStore.getState();

    if (!refreshToken) {
      return null;
    }

    const { data } = await client.POST("/auth/refresh", {
      body: { refreshToken },
    });

    if (!data) {
      return null;
    }

    useSessionStore.getState().setTokens(data);

    return data;
  };

  const refreshOnce = () => {
    if (!refreshPromise) {
      refreshPromise = refreshTokens().finally(() => {
        refreshPromise = null;
      });
    }

    return refreshPromise;
  };

  return {
    onRequest: ({ id, request }) => {
      applyAuthHeaders(request, getLanguage());
      pendingRequests.set(id, request.clone());

      return request;
    },
    onResponse: async ({ id, response, schemaPath }) => {
      const originalRequest = pendingRequests.get(id);
      pendingRequests.delete(id);

      const isAuthRequest = schemaPath.startsWith(AUTH_PATH_PREFIX);

      if (response.status !== 401 || isAuthRequest || !originalRequest) {
        return response;
      }

      const tokens = await refreshOnce();

      if (!tokens) {
        useSessionStore.getState().clearSession();
        return response;
      }

      applyAuthHeaders(originalRequest, getLanguage());

      return fetch(originalRequest);
    },
    onError: ({ id }) => {
      pendingRequests.delete(id);
    },
  };
};
