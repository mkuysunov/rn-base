jest.mock("expo-secure-store", () => {
  const store = new Map();

  return {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, value) => {
      store.set(key, value);
    },
    deleteItemAsync: async (key) => {
      store.delete(key);
    },
  };
});

jest.mock("expo-sqlite/kv-store", () => {
  const store = new Map();

  return {
    __esModule: true,
    default: {
      getItemSync: (key) => store.get(key) ?? null,
      setItemSync: (key, value) => {
        store.set(key, value);
      },
      removeItemSync: (key) => {
        store.delete(key);
      },
    },
  };
});

jest.mock("expo-localization", () => ({
  getLocales: () => [
    {
      languageCode: "ru",
      languageTag: "ru-RU",
      regionCode: "RU",
      textDirection: "ltr",
    },
  ],
}));

jest.mock("expo-font", () => ({
  useFonts: () => [true, null],
  isLoaded: () => true,
  loadAsync: async () => undefined,
}));

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: async () => true,
  hideAsync: async () => true,
}));

jest.mock("expo-linking", () => ({
  createURL: (path) => `rnbase://${path.replace(/^\//, "")}`,
}));

jest.mock(
  "react-native-safe-area-context",
  () => require("react-native-safe-area-context/jest/mock").default
);
