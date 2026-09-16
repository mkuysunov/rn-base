import { render } from "@testing-library/react-native";
import type { ReactElement } from "react";

import { UiProvider } from "@/providers/UiProvider";

export const renderWithProviders = (ui: ReactElement) =>
  render(ui, { wrapper: UiProvider });
