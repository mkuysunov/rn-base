import { Typography } from "@/ui-kit/Typography";

import { LanguageToggleSegmentFrame } from "./LanguageToggleStyles";

interface LanguageToggleSegmentProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export const LanguageToggleSegment = (props: LanguageToggleSegmentProps) => {
  const { label, active, onPress } = props;

  return (
    <LanguageToggleSegmentFrame
      active={active}
      accessibilityState={{ selected: active }}
      onPress={onPress}
    >
      <Typography variant="bodyMedium" tone={active ? "primary" : "secondary"}>
        {label}
      </Typography>
    </LanguageToggleSegmentFrame>
  );
};
