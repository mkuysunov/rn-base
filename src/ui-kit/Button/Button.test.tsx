import { fireEvent, screen } from "@testing-library/react-native";

import { renderWithProviders } from "@/test/renderWithProviders";

import { Button } from "./Button";

describe("Button", () => {
  it("calls onPress when pressed", async () => {
    const onPress = jest.fn();

    await renderWithProviders(<Button title="Save" onPress={onPress} />);
    fireEvent.press(screen.getByText("Save"));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress while loading", async () => {
    const onPress = jest.fn();

    await renderWithProviders(
      <Button title="Save" onPress={onPress} loading />
    );
    fireEvent.press(screen.getByRole("button"));

    expect(onPress).not.toHaveBeenCalled();
    expect(screen.queryByText("Save")).toBeNull();
  });
});
