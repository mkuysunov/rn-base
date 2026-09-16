# rn-base

Мобильное приложение на React Native + Expo (SDK 57) с UI на Tamagui 2. Служит базовым каркасом для новых мобильных приложений: провайдеры, тема Tamagui на токенах дизайн-системы, i18n (ru / en), типобезопасный API-клиент, навигация, сессия.

Архитектура и конвенции: [.claude/ARCHITECTURE.md](.claude/ARCHITECTURE.md), правила для ИИ-ассистентов и разработчиков: [.claude/CLAUDE.md](.claude/CLAUDE.md).

## Требования

- Node ≥ 22.11, corepack (`corepack enable`) — менеджер пакетов Yarn 4 подтянется сам.
- Для Expo Go: приложение Expo Go на телефоне (App Store / Google Play) — ставить Xcode или Android Studio не нужно.
- Для нативной сборки: Xcode + CocoaPods (iOS), Android Studio + JDK 17+ (Android).

## Быстрый старт (Expo Go)

```bash
cp .env.example .env
yarn install
yarn start
```

Отсканируйте QR-код приложением Expo Go (iOS — камерой, Android — из Expo Go). В терминале `i` / `a` откроют симулятор iOS / эмулятор Android, если они установлены.

Бэкенда пока нет: экран входа покажет ошибку сети при отправке кода — это ожидаемо. Адрес API задаётся в `.env` (`EXPO_PUBLIC_API_BASE_URL`); на эмуляторе Android вместо `localhost` используйте `10.0.2.2`.

## Нативная сборка

```bash
yarn ios        # expo run:ios — сборка и запуск в симуляторе
yarn android    # expo run:android — сборка и запуск в эмуляторе
```

Папки `android/` и `ios/` сгенерированы командой `expo prebuild` из [app.json](app.json). После изменения `name`, `slug`, `scheme`, bundle id, шрифтов или config-плагинов пересоберите их: `yarn prebuild:clean`.

## Скрипты

| Команда               | Что делает                                                 |
| --------------------- | ---------------------------------------------------------- |
| `yarn start`          | Metro + QR-код для Expo Go                                 |
| `yarn ios`            | нативная сборка в симулятор iOS                            |
| `yarn android`        | нативная сборка в эмулятор Android                         |
| `yarn prebuild`       | пересобрать `android/` и `ios/` из `app.json`              |
| `yarn prebuild:clean` | то же с полным удалением папок                             |
| `yarn doctor`         | `expo-doctor` — проверка совместимости зависимостей        |
| `yarn generate:api`   | сгенерировать типы API из OpenAPI в `src/services/schema/` |
| `yarn typecheck`      | `tsc --noEmit`                                             |
| `yarn lint`           | ESLint                                                     |
| `yarn format`         | Prettier (запись)                                          |
| `yarn prettier:check` | Prettier (проверка)                                        |
| `yarn test`           | Jest                                                       |

Pre-commit (Husky): `format → lint --max-warnings 0 → typecheck`.

## Как сделать новый проект из каркаса

1. Скопировать папку, удалить `.git`, `node_modules`, `android/`, `ios/`.
2. В `app.json` поменять `name`, `slug`, `scheme`, `ios.bundleIdentifier`, `android.package`; заменить иконки в `assets/images/`.
3. В `.env.example` и `src/config/env.ts` задать свои значения по умолчанию.
4. `yarn install && yarn prebuild` — нативные папки сгенерируются заново.
5. Подключить свой OpenAPI в скрипте `generate:api` и удалить заглушку `src/services/schema/api-schema.ts`.
6. Заменить токены в `src/theme/` на токены своего проекта (или оставить палитру по умолчанию) — `tamaguiConfig.ts` подхватит их автоматически.

## Структура

```
assets/{fonts,images}     шрифты Onest и иконки приложения
src/
  App.tsx                 загрузка шрифтов + провайдеры
  ui-kit/                 примитивы дизайн-системы: Typography, Button, Field, Screen, InfoBanner
  components/             фичевые компоненты: LanguageToggle
  config/                 apiClient, authMiddleware, env
  hooks/                  кросс-фичевые хуки
  i18n/                   i18next + локали ru/en
  icons/                  SVG-иконки (createSvgIcon)
  navigation/             RootNavigator, AuthNavigator, MainNavigator, routes, linking
  providers/              UiProvider (Tamagui), ReactQueryProvider, NavigationProvider, DayjsProvider
  screens/                LoginScreen, HomeScreen, SettingsScreen
  services/               auth (пример домена), storage, schema
  store/                  sessionStore (zustand)
  theme/                  токены дизайн-системы + tamaguiConfig.ts
  test/                   renderWithProviders
  utils/                  phone, formatDate, formatMoney, getErrorMessage
```
