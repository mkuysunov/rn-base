# Архитектура проекта

Base Mobile — базовый каркас мобильного приложения на React Native + Expo: переиспользуемая инфраструктура (провайдеры, тема на токенах дизайн-системы, i18n, типобезопасный API-клиент, навигация, сессия) для старта новых приложений. Это шаблон `rn-base`: копируется для старта нового приложения.

> Статус: ранний каркас. Реализованы инфраструктура и домен `auth` как пример (вход по SMS-коду), три экрана-заготовки (Login, Home, Settings). Прикладные домены и экраны добавляются под конкретный проект. Документ описывает фактическое состояние.

## Технологический стек (установлено)

| Слой                 | Технологии                                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Runtime / Framework  | React Native 0.86, React 19, Expo SDK 57, TypeScript 6, новая архитектура, Hermes                                                                                                                |
| Запуск               | Expo Go (без нативной сборки) **и** нативная сборка (`expo run:ios` / `expo run:android`)                                                                                                        |
| Навигация            | React Navigation 7 (`native-stack`, `bottom-tabs`) + `react-native-screens`, `react-native-safe-area-context`                                                                                    |
| Серверное состояние  | TanStack React Query 5 + `openapi-react-query` + `openapi-fetch`                                                                                                                                 |
| Глобальное состояние | `zustand` (только сессия: токены + пользователь)                                                                                                                                                 |
| Хранилище            | `expo-secure-store` (токены), `expo-sqlite/kv-store` (настройки, синхронный API)                                                                                                                 |
| Локализация          | `i18next` + `react-i18next` + `i18next-icu` (ru / en), детект через `expo-localization` + сохранение                                                                                             |
| UI-кит / стили       | **Tamagui 2** (`tamagui`, `@tamagui/config/v5`): `styled()`, токены и тема из `src/theme`, стеки `YStack`/`XStack`; анимации на RN-драйвере (`@tamagui/animations-react-native`), без reanimated |
| Шрифты               | Onest (5 начертаний) — `expo-font` (плагин для нативной сборки + `useFonts` для Expo Go)                                                                                                         |
| Иконки               | `react-native-svg` через фабрику `createSvgIcon`                                                                                                                                                 |
| Даты                 | `dayjs` (локаль синхронизирована с i18n)                                                                                                                                                         |
| Env                  | `EXPO_PUBLIC_*` из `.env` через Expo CLI                                                                                                                                                         |
| Тестирование         | Jest (`jest-expo`) + Testing Library React Native                                                                                                                                                |
| Качество кода        | ESLint 9 (flat, `eslint-config-expo`) + `simple-import-sort` + `eslint-plugin-react-native`, Prettier, Husky                                                                                     |

### Запланировано (ещё не в `package.json`)

Оптимизирующий компилятор Tamagui (`@tamagui/babel-plugin` + `tamagui.build.ts`; для native необязателен, док рекомендует начинать без него), формы и валидация (`react-hook-form` + `zod`), сеть (`@react-native-community/netinfo` → `onlineManager` React Query), пуши (`expo-notifications`), карты, `react-native-reanimated` / `gesture-handler` (только если понадобятся жесты). Не считайте их доступными, пока не добавите зависимость через `npx expo install`.

## Менеджер пакетов и скрипты

Только **Yarn 4 (berry)** через corepack (`packageManager: yarn@4.18.0`, `nodeLinker: node-modules`).

```bash
yarn start            # Metro + QR-код: Expo Go на устройстве (i / a — симулятор/эмулятор)
yarn ios              # expo run:ios — нативная сборка в симулятор (нужен Xcode + pod install)
yarn android          # expo run:android — нативная сборка в эмулятор
yarn prebuild         # expo prebuild — пересобрать android/ и ios/ из app.json
yarn prebuild:clean   # то же, с удалением папок (после смены bundle id, плагинов, шрифтов)
yarn doctor           # expo-doctor — проверка совместимости зависимостей с SDK
yarn generate:api     # openapi-typescript → src/services/schema/api-schema.ts
yarn typecheck        # tsc --noEmit
yarn lint             # eslint .
yarn format           # prettier --write .
yarn prettier:check   # prettier --check .
yarn test             # jest
yarn test:watch       # jest --watch
```

- Зависимости с нативным кодом ставятся **только** через `npx expo install <pkg>` — он подбирает версию, совместимую с SDK и Expo Go. `yarn add` — только для чисто JS-пакетов.
- В Expo Go работают только модули из состава Expo Go. Сторонние нативные модули (`react-native-mmkv`, `react-native-config` и т. п.) требуют dev-client или нативной сборки — в каркасе их специально нет.
- `.env` не коммитится; создайте его из `.env.example`. Переменные читаются только с префиксом `EXPO_PUBLIC_` и инлайнятся Metro при бандлинге — после правки `.env` перезапустите `yarn start`.
- Pre-commit ([.husky/pre-commit](.husky/pre-commit)): `format → lint --max-warnings 0 → typecheck`.
- Yarn 4.18 держит свежие версии пакетов в карантине 24 часа (`npmMinimalAgeGate`). Если `yarn add` пишет «quarantined» — возьмите версию старше или подождите.

## Структура каталогов

```
├── android/                 # нативный Android-проект — сгенерирован `expo prebuild` из app.json
├── ios/                     # нативный iOS-проект — сгенерирован `expo prebuild` из app.json
├── assets/
│   ├── fonts/               # Onest-*.ttf (Regular, Medium, SemiBold, Bold, ExtraBold) + лицензия OFL
│   └── images/              # иконка, сплэш, adaptive icon, favicon
├── src/
│   ├── App.tsx              # загрузка шрифтов + композиция провайдеров
│   ├── ui-kit/              # примитивы дизайн-системы = папка (Typography, Button, Field, Screen, InfoBanner)
│   ├── components/          # фичевые и общие компоненты приложения (LanguageToggle)
│   ├── config/
│   │   ├── apiClient.ts     # openapi-fetch + openapi-react-query, baseUrl из env
│   │   ├── authMiddleware.ts# Bearer + Accept-Language, refresh по 401 с повтором запроса
│   │   └── env.ts           # типизированный getEnv() поверх process.env.EXPO_PUBLIC_*
│   ├── hooks/               # кросс-фичевые хуки (useAppTheme)
│   ├── i18n/
│   │   ├── config.ts        # инициализация i18next + ICU
│   │   ├── constants.ts     # SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE
│   │   ├── languageDetector.ts # сохранённый язык → язык устройства → ru
│   │   ├── i18next.d.ts     # типизация ключей по ru.json
│   │   └── locales/{ru,en}.json
│   ├── icons/               # SVG-иконки через фабрику createSvgIcon (SvgIconWrapper.tsx)
│   ├── navigation/          # RootNavigator (auth/main), AuthNavigator, MainNavigator, routes.ts, типы, linking
│   ├── providers/           # UiProvider (TamaguiProvider), ReactQueryProvider, NavigationProvider, DayjsProvider
│   ├── screens/             # экран = папка (LoginScreen, HomeScreen, SettingsScreen)
│   ├── services/            # API-слой по доменам + storage + schema
│   ├── store/               # zustand-сторы (sessionStore)
│   ├── theme/               # токены (colors, typography, spacing, radius, shadows, motion, fonts) + tamaguiConfig.ts + navigationTheme
│   ├── test/                # renderWithProviders для тестов
│   └── utils/               # constants, phone, formatDate, formatMoney, getErrorMessage
├── tamagui.config.ts        # реэкспорт src/theme/tamaguiConfig.ts для инструментов Tamagui
├── app.json                 # Expo-конфиг: имя, bundle id, scheme, плагины (splash, font, localization, secure-store, sqlite)
├── babel.config.js          # babel-preset-expo
├── eslint.config.js         # flat config
├── jest.config.js, jest.setup.js
├── tsconfig.json            # extends expo/tsconfig.base + paths
├── ARCHITECTURE.md, CLAUDE.md (в .claude/)
└── .env.example
```

`android/` и `ios/` — **производные** от `app.json`. Ручные правки в них допустимы, но всё, что можно выразить через `app.json` и config-плагины (иконки, сплэш, шрифты, scheme, permissions), делайте там и пересобирайте `yarn prebuild:clean`. Для нового проекта на основе каркаса: поменять `name`, `slug`, `scheme`, `ios.bundleIdentifier`, `android.package` в `app.json` → `yarn prebuild:clean`.

## API-слой

Полностью типобезопасен через OpenAPI-кодогенерацию:

1. `yarn generate:api` собирает типы `paths` в [src/services/schema/api-schema.ts](src/services/schema/api-schema.ts). Пока бэкенда нет, файл написан вручную в формате `openapi-typescript` и покрывает только `auth` + `/users/me` по примерному контракту OTP-авторизации. После появления OpenAPI — регенерировать и больше не править руками.
2. [src/config/apiClient.ts](src/config/apiClient.ts) создаёт `openapi-fetch`-клиент с `baseUrl` из env и подключает [authMiddleware](src/config/authMiddleware.ts): заголовки `Authorization: Bearer` и `Accept-Language`, на `401` — один `POST /auth/refresh` (single-flight), запись новых токенов и повтор исходного запроса; если refresh не удался — `clearSession()`.
3. Доменные хуки оборачивают `apiClient.useQuery()` / `apiClient.useMutation()` со строковыми путями (см. [src/services/auth/useAuth.ts](src/services/auth/useAuth.ts): `useSendOtp`, `useVerifyOtp`, `useGetMe`, `useLogout`).

Авторизация — Bearer-токены в теле ответа (не cookie), как в контракте. Токены хранятся в `expo-secure-store`, пользователь — только в памяти и подтягивается `useGetMe`.

### Доменные сервисы (`src/services/<domain>/`)

Образец — домен **`auth`**. Прикладные домены добавляются по той же структуре: `use<Domain>.ts` (хуки), `<domain>Types.ts` (ручные типы поверх `components["schemas"]`), `index.ts` (реэкспорт). Общие типы — в [src/services/commonTypes.ts](src/services/commonTypes.ts). Корневого барреля `src/services/index.ts` нет намеренно — импортируйте из `@/services/<domain>`.

### Хранилище (`src/services/storage/`)

Два синхронных адаптера с одним интерфейсом `SyncStorage`: [secureStorage](src/services/storage/secureStorage.ts) (Keychain / Keystore через `expo-secure-store` — для токенов) и [preferencesStorage](src/services/storage/preferencesStorage.ts) (`expo-sqlite/kv-store` — язык и прочие настройки). Ключи — только из [storageKeys.ts](src/services/storage/storageKeys.ts).

## Управление состоянием

Три чётко разделённых слоя:

- **Серверное состояние** — TanStack React Query (`staleTime: 1m`, `gcTime: 5m`, без refetch-on-focus, `retry: false`; см. [src/providers/ReactQueryProvider.tsx](src/providers/ReactQueryProvider.tsx)).
- **Состояние навигации** — параметры экранов React Navigation (типизированы в [src/navigation/navigationTypes.ts](src/navigation/navigationTypes.ts)). Это мобильный аналог URL-состояния: фильтры и идентификаторы передаются через params, deep links описаны в [linking.ts](src/navigation/linking.ts).
- **UI-состояние** — локальный state компонентов.

Единственный глобальный стор — [src/store/sessionStore.ts](src/store/sessionStore.ts) (`zustand`): токены (персистятся в secure-store при каждом изменении, читаются синхронно при старте), пользователь, `setSession` / `setTokens` / `clearSession`. Новые сторы добавляются в `src/store/` только там, где состояние действительно кросс-экранное.

## Навигация и доступ

- Имена маршрутов — централизованно в [src/navigation/routes.ts](src/navigation/routes.ts) (`ROUTES`), param-листы — в `navigationTypes.ts`. Никогда не хардкодьте строки экранов.
- [RootNavigator](src/navigation/RootNavigator.tsx) выбирает ветку по `selectIsAuthenticated`: `Auth` (native-stack: Login) или `Main` (bottom-tabs: Home, Settings). Переключение происходит автоматически при изменении сессии — вручную «навигировать на логин» не нужно.
- Опции навигаторов (шапки, таб-бар в цветах темы) — в [navigatorOptions.ts](src/navigation/navigatorOptions.ts); иконки табов — в `tabBarIcons.tsx`.
- Deep links: `scheme` из `app.json` (`rnbase://`), маппинг путей — в `linking.ts`.

## Path-алиасы

Metro (Expo) и TypeScript читают `paths` из [tsconfig.json](tsconfig.json), Jest — `moduleNameMapper` в `jest.config.js`. Доступны только два алиаса: `@/*` → `src/*`, `@assets/*` → `assets/*`. Используйте их вместо относительных импортов между папками; внутри одной папки компонента — относительные (`./ButtonStyles`).

## Стилизация

- **Tamagui 2** — единственный способ описывать внешний вид. Конфиг собирается в [src/theme/tamaguiConfig.ts](src/theme/tamaguiConfig.ts) **из токенов дизайн-системы** в `src/theme` (`colors`, `spacing`, `radius`, `typography`): `createTokens` (цвета, `space`/`size` со шкалой 4px: `$1` = 4, `$4` = 16, `$6` = 24; `radius`: `$pill`, `$field`, `$card`), `createFont` для Onest с картой `face` по начертаниям (400–800 → `Onest-Regular…ExtraBold`), тема `light` как plain-объект с ключами Tamagui (`background`, `color`, `borderColor`, `accentBackground`…) и семантикой проекта (`$textPrimary`, `$textSecondary`, `$surface`, `$primary`, `$accentSoft`, `$danger`…), под-темы `light_accent` и `light_danger`. Корневой [tamagui.config.ts](tamagui.config.ts) только реэкспортит его для инструментов.
- `media`, `shorthands` и `settings` берутся из `@tamagui/config/v5`; `onlyAllowShorthands` выключен, поэтому доступны и длинные имена (`paddingHorizontal`), и шорткаты (`px`).
- Компонент описывает свои стили в `ComponentStyles.ts` через `styled(View | YStack | Text | Input | <RN-компонент>, { name, variants, defaultVariants })`; варианты — объекты (`variant`, `size`, `tone`, `active`), состояния — `pressStyle` / `focusStyle`, анимации — `transition="100ms"` (драйвер RN Animated).
- Раскладка — `YStack` / `XStack` с пропсами-токенами (`gap="$4"`, `padding="$4"`), не `View` + `StyleSheet`. `StyleSheet.create` в прикладном коде не используется; RN-компоненты без Tamagui-аналога оборачиваются `styled(SafeAreaView | KeyboardAvoidingView, …)`.
- Текст — только через [Typography](src/ui-kit/Typography) (`variant`, `tone`, `align`), экраны — через [Screen](src/ui-kit/Screen) (safe-area, фон, отступы, `scroll`, `contentProps`).
- `TamaguiProvider` подключён в [UiProvider](src/providers/UiProvider.tsx) с `defaultTheme="light"`; тёмной темы у продукта нет. Тема навигации ([navigationTheme.ts](src/theme/navigationTheme.ts)) собрана из тех же токенов.

## Интернационализация

- Все пользовательские строки — через `useTranslation()` / `t()`.
- Локали: [ru.json](src/i18n/locales/ru.json) (источник истины, fallback) и [en.json](src/i18n/locales/en.json). Ключи типизированы по `ru.json` ([i18next.d.ts](src/i18n/i18next.d.ts)).
- ICU MessageFormat для плюрализации и подстановок (`{count, plural, …}`, `{name}`).
- Язык: сохранённый в `preferencesStorage` → язык устройства (`expo-localization`) → `ru`. Смена — `i18n.changeLanguage()`, детектор сам сохраняет выбор ([languageDetector.ts](src/i18n/languageDetector.ts)).
- `Accept-Language` пробрасывается в API-клиент, локаль `dayjs` синхронизируется в [DayjsProvider](src/providers/DayjsProvider.tsx).

## Обработка ошибок

Типы ответов и ошибок берутся из контракта (`components["schemas"]["ApiError"]` → `ApiErrorResponse` в `commonTypes.ts`) и попадают в `error` мутаций/запросов. Для показа пользователю — [getErrorMessage(error, fallback)](src/utils/getErrorMessage.ts) + [InfoBanner](src/ui-kit/InfoBanner). Отдельного enum кодов ошибок пока нет.

## Тестирование

Jest с пресетом `jest-expo`; нативные модули Expo и safe-area замоканы в [jest.setup.js](jest.setup.js), пакеты `tamagui`/`@tamagui` добавлены в `transformIgnorePatterns`. Компоненты рендерятся через [renderWithProviders](src/test/renderWithProviders.tsx) (оборачивает в `UiProvider`), тесты лежат рядом с кодом (`Button.test.tsx`, `phone.test.ts`), smoke-тест приложения — `src/App.test.tsx`. Запуск одного файла: `yarn jest src/path/to/file.test.tsx`.

## Конвенции

- **Экраны** ([src/screens/](src/screens/)) — тонкие, делегируют логику компонентам и сервисам; экран = папка: `Screen.tsx`, `ScreenStyles.ts`, при необходимости `ScreenConstants.ts`, `ScreenTypes.ts`, подкомпоненты шага (`PhoneStep.tsx`), `index.ts`.
- **UI-кит** (`src/ui-kit/`) — примитивы дизайн-системы без прикладной логики и без i18n (Typography, Button, Field, Screen, InfoBanner; далее Card, Chip, ListRow, Badge…). **Компоненты** (`src/components/`) — фичевые и общие компоненты приложения, могут использовать i18n, сервисы и стор (LanguageToggle).
- **Компонент = папка** по образцу [src/ui-kit/Button](src/ui-kit/Button): `Component.tsx`, `ComponentTypes.ts` (пропсы через `GetProps<typeof Frame>`), `ComponentConstants.ts`, `ComponentStyles.ts` (`styled()`-фреймы), `index.ts` (файлы, которые не нужны, не создаются).
- **Сервис-домен** = папка `src/services/<domain>/`: `use<Domain>.ts`, `<domain>Types.ts`, `index.ts`.
- **Иконки** — через фабрику [createSvgIcon](src/icons/SvgIconWrapper.tsx) (`size`, `color`, `filled`).
- **Импорты** сортируются `simple-import-sort` (нарушение = ошибка); из корневых баррелей (`@/components`, `@/services`, …) импортировать запрещено правилом `no-restricted-imports`.
- **Навигация** — только через `ROUTES` и типизированные `navigation.navigate()`.
