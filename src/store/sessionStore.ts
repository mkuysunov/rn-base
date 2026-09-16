import { create } from "zustand";

import type {
  AuthSession,
  AuthTokens,
  AuthUser,
} from "@/services/auth/authTypes";
import { secureStorage } from "@/services/storage/secureStorage";
import { STORAGE_KEYS } from "@/services/storage/storageKeys";

interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  setSession: (session: AuthSession) => void;
  setTokens: (tokens: AuthTokens) => void;
  setUser: (user: AuthUser | null) => void;
  clearSession: () => void;
}

const readStoredTokens = (): Pick<
  SessionState,
  "accessToken" | "refreshToken"
> => ({
  accessToken: secureStorage.getItem(STORAGE_KEYS.accessToken),
  refreshToken: secureStorage.getItem(STORAGE_KEYS.refreshToken),
});

const writeStoredTokens = (tokens: AuthTokens | null) => {
  if (!tokens) {
    secureStorage.removeItem(STORAGE_KEYS.accessToken);
    secureStorage.removeItem(STORAGE_KEYS.refreshToken);
    return;
  }

  secureStorage.setItem(STORAGE_KEYS.accessToken, tokens.accessToken);
  secureStorage.setItem(STORAGE_KEYS.refreshToken, tokens.refreshToken);
};

export const useSessionStore = create<SessionState>()((set) => ({
  ...readStoredTokens(),
  user: null,
  setSession: (session) => {
    writeStoredTokens(session);
    set({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      user: session.user,
    });
  },
  setTokens: (tokens) => {
    writeStoredTokens(tokens);
    set({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
  },
  setUser: (user) => set({ user }),
  clearSession: () => {
    writeStoredTokens(null);
    set({ accessToken: null, refreshToken: null, user: null });
  },
}));

export const selectIsAuthenticated = (state: SessionState) =>
  state.accessToken !== null;

export const selectUser = (state: SessionState) => state.user;
