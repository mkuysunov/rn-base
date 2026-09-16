import { render, screen } from "@testing-library/react-native";

import App from "./App";

describe("App", () => {
  it("renders the login screen for a guest", async () => {
    await render(<App />);

    expect(await screen.findByText("Вход")).toBeTruthy();
  });
});
