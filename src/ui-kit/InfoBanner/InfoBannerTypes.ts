export type InfoBannerTone = "info" | "danger";

export interface InfoBannerProps {
  message: string;
  tone?: InfoBannerTone;
}
