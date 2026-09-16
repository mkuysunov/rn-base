import * as SecureStore from "expo-secure-store";

import type { SyncStorage } from "./storageTypes";

export const secureStorage: SyncStorage = {
  getItem: (key) => SecureStore.getItem(key),
  setItem: (key, value) => {
    SecureStore.setItem(key, value);
  },
  removeItem: (key) => {
    void SecureStore.deleteItemAsync(key);
  },
};
