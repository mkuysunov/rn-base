import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import { getEnv } from "@/config/env";
import i18next from "@/i18n/config";
import type { paths } from "@/services/schema/api-schema";

import { createAuthMiddleware } from "./authMiddleware";

export const fetchClient = createFetchClient<paths>({
  baseUrl: getEnv().API_BASE_URL,
});

fetchClient.use(createAuthMiddleware(fetchClient, () => i18next.language));

export const apiClient = createClient(fetchClient);
