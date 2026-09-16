import { styled, YStack } from "tamagui";

import { Typography } from "@/ui-kit/Typography";

import type { InfoBannerProps } from "./InfoBannerTypes";

const InfoBannerFrame = styled(YStack, {
  name: "InfoBanner",
  role: "alert",
  borderRadius: "$field",
  paddingHorizontal: "$4",
  paddingVertical: "$3",
  variants: {
    tone: {
      info: { backgroundColor: "$accentSoft" },
      danger: { backgroundColor: "$dangerSoft" },
    },
  } as const,
  defaultVariants: {
    tone: "info",
  },
});

export const InfoBanner = (props: InfoBannerProps) => {
  const { message, tone = "info" } = props;

  return (
    <InfoBannerFrame tone={tone}>
      <Typography
        variant="small"
        tone={tone === "danger" ? "danger" : "primary"}
      >
        {message}
      </Typography>
    </InfoBannerFrame>
  );
};
