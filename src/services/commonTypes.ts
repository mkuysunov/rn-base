import type { components } from "@/services/schema/api-schema";

export type ApiErrorResponse = components["schemas"]["ApiError"];

export interface Paginated<T> {
  items: T[];
  nextCursor: string | null;
}
