import { HomeIcon } from "@/icons/HomeIcon";
import { SettingsIcon } from "@/icons/SettingsIcon";

interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export const renderHomeTabIcon = (props: TabBarIconProps) => {
  const { focused, color, size } = props;

  return <HomeIcon color={color} size={size} filled={focused} />;
};

export const renderSettingsTabIcon = (props: TabBarIconProps) => {
  const { focused, color, size } = props;

  return <SettingsIcon color={color} size={size} filled={focused} />;
};
