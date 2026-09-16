import Storage from "expo-sqlite/kv-store";

import type { SyncStorage } from "./storageTypes";

export const preferencesStorage: SyncStorage = {
  getItem: (key) => Storage.getItemSync(key),
  setItem: (key, value) => {
    Storage.setItemSync(key, value);
  },
  removeItem: (key) => {
    Storage.removeItemSync(key);
  },
};
