# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Base Mobile** — a React Native + Expo scaffold with Tamagui as the UI layer: reusable infrastructure (providers, Tamagui theme built from design tokens, i18n, type-safe API client, navigation, session) for bootstrapping new mobile apps. It is the `rn-base` template: copy it to start a new app. It is an early scaffold: the infrastructure, the `auth` domain (SMS-OTP login) and three placeholder screens (Login, Home, Settings) are implemented; application-specific domains are added per project.

## Package Manager

Only **Yarn 4 (berry)** via corepack (`packageManager: yarn@4.18.0`, `nodeLinker: node-modules`). Do not use `npm install`.

- Anything with native code goes through **`npx expo install <pkg>`** (picks the SDK-compatible version). Plain `yarn add` is only for pure-JS packages.
- Yarn 4.18 quarantines package versions younger than 24h (`npmMinimalAgeGate`). If `yarn add` says "quarantined", pick an older version or wait — do not disable the gate.

## Commands

```bash
yarn start            # Metro + QR code → Expo Go (press i / a for simulator / emulator)
yarn ios              # expo run:ios — native build into the simulator
yarn android          # expo run:android — native build into the emulator
yarn prebuild:clean   # regenerate android/ and ios/ from app.json (after changing ids, plugins, fonts)
yarn doctor           # expo-doctor — dependency/SDK compatibility check
yarn generate:api     # openapi-typescript → src/services/schema/api-schema.ts
yarn typecheck        # tsc --noEmit
yarn lint             # eslint .
yarn format           # prettier --write .
yarn test             # jest; single file: yarn jest src/path/to/file.test.tsx
```

## Important Notes on the Current State

- **Two ways to run.** `yarn start` targets **Expo Go** (no native build; everything in the scaffold is Expo Go compatible). `yarn ios` / `yarn android` do a native build from the committed `android/` and `ios/` folders. Keep both working: never add a native module that is not part of Expo Go unless the user explicitly accepts dropping Expo Go (then add `expo-dev-client`).
- **`android/` and `ios/` are generated** by `expo prebuild` from [app.json](app.json). Express icons, splash, fonts, URL scheme, bundle id and permissions through `app.json` and config plugins, then run `yarn prebuild:clean`. Manual native edits are allowed but will be lost on a clean prebuild — say so when you make one.
- **There is no backend yet.** [src/services/schema/api-schema.ts](src/services/schema/api-schema.ts) is a hand-written placeholder in `openapi-typescript` output format covering only `auth` + `/users/me` (an example OTP contract). `yarn generate:api` points at `http://localhost:3000/api-json` (NestJS Swagger default) — adjust the URL in `package.json` when the backend exists, regenerate, and stop editing the file by hand.
- **Env** is read from `.env` (`EXPO_PUBLIC_API_BASE_URL`, `EXPO_PUBLIC_BRAND_NAME`) via [src/config/env.ts](src/config/env.ts). `.env` is git-ignored; copy `.env.example`. Values are inlined by Metro at bundle time — restart `yarn start` after editing. On the Android emulator use `http://10.0.2.2:<port>` instead of `localhost`.
- **Fonts** (Onest, 5 weights in `assets/fonts/`) are embedded natively by the `expo-font` config plugin _and_ loaded at runtime with `useFonts` in [src/App.tsx](src/App.tsx) so Expo Go works. Both paths use the same family names (`Onest-Regular`, `Onest-Medium`, …). Do not set `fontWeight` together with a weight-specific `fontFamily` — Android would synthesize bold.
- **Pre-commit hook** ([.husky/pre-commit](.husky/pre-commit)) runs `format` → `lint --max-warnings 0` → `typecheck`.
- **Tests** live next to the code (`Button.test.tsx`, `phone.test.ts`, `src/App.test.tsx`). Render components through [renderWithProviders](src/test/renderWithProviders.tsx) (wraps in `UiProvider`); Tamagui components need the provider. Native Expo modules are mocked in [jest.setup.js](jest.setup.js); `tamagui` / `@tamagui` are in the `transformIgnorePatterns` exceptions. Add a mock there when you introduce a new native module.

## Architecture

- **Stack**: Expo SDK 57 / React Native 0.86 / React 19 / TypeScript 6, **Tamagui 2** (`tamagui` + `@tamagui/config/v5`, React Native animation driver, no reanimated; `react-dom` is installed only because the `tamagui` umbrella package imports it), React Navigation 7 (native-stack + bottom-tabs), TanStack Query 5 on top of `openapi-fetch` + `openapi-react-query`, `zustand` (session only), i18next + ICU (ru / en), `dayjs`, `react-native-svg`, `expo-secure-store`, `expo-sqlite/kv-store`, `expo-localization`, `expo-font`, `expo-splash-screen`, `expo-linking`, `expo-constants`.
- **Provider composition** ([src/App.tsx](src/App.tsx)): `useFonts` gate (splash stays until fonts load) → `SafeAreaProvider` → `UiProvider` (`TamaguiProvider`, `defaultTheme="light"`) → `ReactQueryProvider` → `DayjsProvider` → `NavigationProvider` (`NavigationContainer` + theme + linking) → `StatusBar` + `RootNavigator`. `@/i18n/config` is imported for its side effect at the top of `App.tsx`.
- **The API is type-safe via codegen.** [src/config/apiClient.ts](src/config/apiClient.ts) wraps the `paths` types into `fetchClient` (openapi-fetch) and `apiClient` (openapi-react-query). [src/config/authMiddleware.ts](src/config/authMiddleware.ts) sets `Authorization: Bearer` + `Accept-Language`, and on `401` runs a single-flight `POST /auth/refresh`, stores the new tokens and replays the original request; if refresh fails it calls `clearSession()`. Domain hooks call `apiClient.useQuery / useMutation` with string paths (see [src/services/auth/useAuth.ts](src/services/auth/useAuth.ts)). Errors are typed from the contract (`ApiErrorResponse` in [src/services/commonTypes.ts](src/services/commonTypes.ts)); show them with `getErrorMessage(error, fallback)` + `InfoBanner`.
- **Auth is Bearer + refresh token in the body** (example contract), not cookies. Tokens live in `expo-secure-store` (Keychain / Keystore) through [src/store/sessionStore.ts](src/store/sessionStore.ts); the user object is memory-only and refreshed by `useGetMe`.
- **Three layers of state**: server — React Query (`staleTime 1m`, `gcTime 5m`, no refetch-on-focus, `retry: false`); navigation — typed screen params (the mobile analogue of URL state); UI — local state. The only global store is `sessionStore`; add another `src/store/*` store only for genuinely cross-screen state.
- **Navigation**: route names in [src/navigation/routes.ts](src/navigation/routes.ts) (`ROUTES`), param lists + screen-prop helpers in [navigationTypes.ts](src/navigation/navigationTypes.ts). [RootNavigator](src/navigation/RootNavigator.tsx) switches between the `Auth` stack and the `Main` tabs based on `selectIsAuthenticated` — never navigate to Login manually, change the session instead. Navigator options live in [navigatorOptions.ts](src/navigation/navigatorOptions.ts), tab icons in `tabBarIcons.tsx`, deep links in `linking.ts` (scheme from `app.json`).
- **Theme** ([src/theme](src/theme)): design tokens as TS constants (a default palette and the Onest font; replace them with your design system) — `colors` (raw scale) + `semanticColors` (roles), `fontFamily` / `fontSizes` / `lineHeights` / `fontWeights` (Onest), `spacing`, `layout`, `radius`, `shadows`, `motion`. [src/theme/tamaguiConfig.ts](src/theme/tamaguiConfig.ts) turns them into the Tamagui config: `createTokens` (`$1` = 4px, `$4` = 16, `$6` = 24; `size` adds `$touch`, `$tabBar`; `radius` adds `$pill`, `$field`, `$card`, `$cardLarge`), `createFont` for Onest with a `face` map per weight, a plain-object `light` theme (Tamagui keys plus project semantic keys `$textPrimary`, `$textSecondary`, `$surface`, `$primary`, `$primaryStrong`, `$accentSoft`, `$border`, `$danger`, `$dangerSoft`), sub-themes `light_accent` / `light_danger`, and `media` / `shorthands` / `settings` from `@tamagui/config/v5` with `onlyAllowShorthands: false`. The root [tamagui.config.ts](tamagui.config.ts) only re-exports it for Tamagui tooling. `navigationTheme.ts` maps the same tokens onto React Navigation. Keep the values identical to your web design tokens.
- **i18n**: locales `ru` (source of truth, fallback) and `en` in [src/i18n/locales](src/i18n/locales), ICU MessageFormat, keys typed from `ru.json`. Language resolution: saved preference → device locale (`expo-localization`) → `ru`. Switching goes through `i18n.changeLanguage()`; the detector persists the choice. `Accept-Language` is sent to the API; the `dayjs` locale follows in `DayjsProvider`.
- **Storage** ([src/services/storage](src/services/storage)): two sync adapters behind one `SyncStorage` interface — `secureStorage` (tokens) and `preferencesStorage` (language and other settings). Keys only from `storageKeys.ts`.

## Conventions

- **Path aliases**: exactly two — `@/*` → `src/*` and `@assets/*` → `assets/*` (declared in [tsconfig.json](tsconfig.json); Metro reads them, Jest via `moduleNameMapper`). Use them for cross-folder imports; use relative imports only inside a component / screen folder. Never add bare aliases like `@components`.
- **Component = folder**, following [src/ui-kit/Button](src/ui-kit/Button): `Component.tsx`, `ComponentTypes.ts` (derive props with `GetProps<typeof Frame>`), `ComponentConstants.ts`, `ComponentStyles.ts` (`styled()` frames), `index.ts`. A component that is nothing but a `styled()` call lives directly in `Component.tsx` (see `Typography`). Create only the files the component needs. Screens follow the same template in `src/screens/<Screen>/` (`ScreenStyles.ts`, `ScreenConstants.ts`, sub-step components next to it).
- **Service domain** = a `src/services/<domain>/` folder: `use<Domain>.ts` (hooks on top of `apiClient`), `<domain>Types.ts` (types derived from `components["schemas"]`), `index.ts` (re-export).
- **Icons** are built by the [createSvgIcon](src/icons/SvgIconWrapper.tsx) factory (supports `size`, `color`, `filled`); one icon per file in `src/icons/`.
- **Imports are sorted** by `simple-import-sort` (error on violation). Prettier: double quotes, `trailingComma: es5`.
- Before any work with the API, run `yarn generate:api` first (once the backend exists).

### Feature Organization

- `src/screens/` — route-level components (thin, delegate to components and services)
- `src/ui-kit/` — design-system primitives, one folder per component; no app logic, no i18n, no services (Typography, Button, Field, Screen, InfoBanner)
- `src/components/` — feature and shared app components, one folder per component; may use i18n, services and stores (LanguageToggle)
- `src/services/<domain>/` — API hooks + domain types per feature; `src/services/storage/` — storage adapters; `src/services/schema/` — generated contract
- `src/navigation/` — navigators, route names, param types, linking
- `src/store/` — zustand stores (session)
- `src/hooks/` — cross-feature custom hooks
- `src/providers/` — React context providers (ReactQueryProvider, NavigationProvider, DayjsProvider)
- `src/theme/` — design tokens; `src/utils/` — pure helpers (`phone`, `formatDate`, `formatMoney`, `getErrorMessage`, `constants`)

### Barrel Imports Rule

**Do NOT import from a root barrel.** There are no `src/ui-kit/index.ts`, `src/components/index.ts`, `src/services/index.ts`, `src/icons/index.ts` files on purpose, and `no-restricted-imports` blocks `@/ui-kit`, `@/components`, `@/screens`, `@/services`, `@/hooks`, `@/icons`, `@/providers`, `@/store`. Always import from the concrete module path.

Bad:

```tsx
import { Button } from "@/ui-kit";
import { useAuth } from "@/services";
```

Good:

```tsx
import { Button } from "@/ui-kit/Button";
import { useSendOtp } from "@/services/auth/useAuth";
import { HomeIcon } from "@/icons/HomeIcon";
```

The per-folder `index.ts` files (`src/ui-kit/Button/index.ts`, `src/components/LanguageToggle/index.ts`, `src/services/auth/index.ts`) are the correct granularity. When one line pulls symbols from several domains, split it into several deep imports; `simple-import-sort` will order them.

Why this matters: Metro bundles everything a module graph reaches. A root barrel drags every component into the initial bundle, slows Fast Refresh and makes circular imports easy to introduce.

### Styling

**Tamagui only.** Every visual decision goes through `styled()`, Tamagui props and tokens. No `StyleSheet.create`, no UI library besides Tamagui.

- Layout with `YStack` / `XStack` and token props: `gap="$4"`, `padding="$4"`, `alignItems="center"`. Do not use `View` + `StyleSheet` for layout.
- Colors, spacing, radius and fonts come from tokens and theme keys: `backgroundColor="$surface"`, `color="$textSecondary"`, `borderRadius="$pill"`, `paddingHorizontal="$4"`, `fontSize="$body"`. No hardcoded hex, no magic numbers. If a value is missing, add it to `src/theme` first; `tamaguiConfig.ts` derives tokens from there.
- Reusable frames are declared in `ComponentStyles.ts` with `styled(View | YStack | XStack | Text | Input | ScrollView, { name, ...base, variants, defaultVariants })`. Variants are objects keyed by prop (`variant`, `size`, `tone`, `active`, `fullWidth`, `disabled`); never build style keys from strings.
- Interaction states use `pressStyle` / `focusStyle` (`pressStyle={{ scale: 0.97, opacity: 0.9 }}`) with `transition="100ms"` (React Native Animated driver from `@tamagui/config/v5-rn`). Do not add `react-native-reanimated` for this.
- React Native components without a Tamagui equivalent (`SafeAreaView`, `KeyboardAvoidingView`) are wrapped with `styled(RNComponent, {...})` so they accept tokens too (see `Screen`, `LoginScreen`).
- Text goes through `Typography` (`variant`, `tone`, `align`); raw `Text` is only allowed inside `Typography` itself. Only use `fontWeight` values that exist in the Onest `face` map (400 to 800).
- Screens are wrapped in `Screen` (safe-area edges, background, gutter, optional `scroll`, extra layout via `contentProps`). Tab screens pass `edges={["top"]}` because the tab bar handles the bottom inset.
- Both long-form (`paddingHorizontal`) and shorthand (`px`) props are accepted; prefer long-form for readability and never mix both spellings of one property in a file.
- Reference theme keys (`$primary`, `$textPrimary`) rather than raw palette tokens (`$violet500`) so a future theme swap is one file. Use `theme="accent"` / `theme="danger"` sub-themes for Tamagui built-ins that rely on `$background` / `$color`.
- The optimizing compiler (`@tamagui/babel-plugin`) is intentionally not installed; add it with a `tamagui.build.ts` only when profiling shows a need.

### No Inline Styles Rule

**Do NOT use the `style={{ ... }}` prop and do NOT create `StyleSheet`s.** Styling priority:

1. **`styled()` frames** in `ComponentStyles.ts`: for anything reused or anything with variants / interaction states.
2. **Tamagui props on `YStack` / `XStack` / `Typography`**: for one-off layout and spacing inside a screen (`<YStack gap="$3">`).

`style` objects are only acceptable for values Tamagui cannot express (a third-party component's mandatory `contentContainerStyle`, an animated value), and then as a named constant, never an inline literal. `react-native/no-inline-styles` is an error.

### UI Components Rule

**Use the project primitives, not raw React Native elements, in screens and feature components:**

- text → `Typography` (never raw `Text` from `react-native` or `tamagui`)
- buttons → `Button`; a custom pressable is a `styled(View, { role: "button", pressStyle })` frame inside a dedicated component (`LanguageToggleSegment`), never a bare `Pressable` / `TouchableOpacity`
- text inputs → `Field` (wraps Tamagui `Input` with label / helper / error / focus state)
- screen root → `Screen`; inline messages → `InfoBanner`
- icons → components from `src/icons/` (`createSvgIcon`), never inline `<Svg>` in a screen
- layout → `YStack` / `XStack` from `tamagui` (`View` from `tamagui` when direction does not matter); `ScrollView` from `tamagui`
- Tamagui built-ins (`Sheet`, `Dialog`, `Switch`, `Select`, …) may be used directly but should be wrapped in a project component once they need project styling

If a primitive is missing (e.g. `Card`, `Chip`, `ListRow`, `Badge` from the design system), add it to `src/ui-kit/` following the component template; a primitive must not import i18n, services or stores — anything that does belongs in `src/components/` instead of styling a stack ad hoc in a screen.

### One Component per File Rule

**Do NOT define multiple React components in one file.** Each component lives in its own file. When a component needs a helper/sub-component (e.g. `LoginScreen` renders `PhoneStep` and `CodeStep`), extract it into a separate file inside the parent's folder — or into its own component folder if it is reusable elsewhere. Render-prop helpers for navigator options (`tabBarIcon`) live in `src/navigation/tabBarIcons.tsx`, not inline in the navigator. Only trivial non-JSX helpers (formatters, constants) may stay in the parent file, following the folder template (`ComponentConstants.ts`, `ComponentUtils.ts`).

### No Destructuring in Function Args Rule

**Do NOT destructure props (or any object argument) in the function signature.** Accept a single `props` parameter and destructure it in the first line of the function body. This applies to React components, hooks, and regular functions taking an options object.

Bad:

```tsx
export const Field = ({ label, helper, error, ...rest }: FieldProps) => { ... };
```

Good:

```tsx
export const Field = (props: FieldProps) => {
  const { label, helper, error, ...rest } = props;
  ...
};
```

### Comments Rule

**Do NOT add comments by default.** Code must be self-explanatory: clear names, small functions, obvious structure. Do not narrate what the code does, do not add section headers (`// render`, `// handlers`, `// state`), do not restate JSX structure, do not describe what you just changed.

A comment is justified only when it carries information the code cannot: a non-obvious **why** (a backend quirk, a platform workaround, an intentional deviation from the obvious approach), a tricky business rule that is not visible from the values, or a `TODO`/`FIXME` the user explicitly asked for. Such a comment explains the reason, never the mechanics. When in doubt, leave it out — and never re-add comments that were previously deleted.

### Internationalization

All user-facing strings go through i18next (`useTranslation` / `t`). Locale files: [src/i18n/locales/ru.json](src/i18n/locales/ru.json) and [src/i18n/locales/en.json](src/i18n/locales/en.json). ICU MessageFormat is supported for pluralization (`{count, plural, one {…} few {…} many {…} other {…}}` for `ru`).

**Adding new strings:** add the key to `ru.json` (source of truth, typed) **and** the English text to `en.json` in the same change — a key that exists only in `ru.json` is a bug. Only `ru` and `en` are supported; do not add other locales without an explicit request.

### Native Modules Rule

Before adding a dependency with native code: check it is included in Expo Go (Expo SDK docs → "Expo Go" badge, or `npx expo-doctor`). Install it with `npx expo install`, add its config plugin to `app.json` if it has one, mock it in `jest.setup.js`, and mention that `yarn prebuild:clean` is required for the native folders to pick it up. Never hand-edit `Podfile`, `build.gradle` or `Info.plist` for something a config plugin can do.
