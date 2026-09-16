import { DEFAULT_SCREEN_EDGES, SCROLL_CONTENT_STYLE } from "./ScreenConstants";
import { ScreenContent, ScreenRoot, ScreenScroll } from "./ScreenStyles";
import type { ScreenProps } from "./ScreenTypes";

export const Screen = (props: ScreenProps) => {
  const {
    children,
    scroll = false,
    padded = true,
    edges = DEFAULT_SCREEN_EDGES,
    background = "default",
    contentProps,
  } = props;

  const content = (
    <ScreenContent padded={padded} {...contentProps}>
      {children}
    </ScreenContent>
  );

  return (
    <ScreenRoot edges={edges} background={background}>
      {scroll ? (
        <ScreenScroll
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={SCROLL_CONTENT_STYLE}
        >
          {content}
        </ScreenScroll>
      ) : (
        content
      )}
    </ScreenRoot>
  );
};
