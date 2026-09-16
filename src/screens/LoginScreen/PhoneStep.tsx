import { useTranslation } from "react-i18next";
import { YStack } from "tamagui";

import { Button } from "@/ui-kit/Button";
import { Field } from "@/ui-kit/Field";
import { InfoBanner } from "@/ui-kit/InfoBanner";

interface PhoneStepProps {
  phone: string;
  error?: string;
  loading: boolean;
  onPhoneChange: (value: string) => void;
  onSubmit: () => void;
}

export const PhoneStep = (props: PhoneStepProps) => {
  const { phone, error, loading, onPhoneChange, onSubmit } = props;
  const { t } = useTranslation();

  return (
    <YStack gap="$4">
      <Field
        label={t("auth.phoneLabel")}
        placeholder={t("auth.phonePlaceholder")}
        value={phone}
        onChangeText={onPhoneChange}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        autoComplete="tel"
        returnKeyType="done"
        onSubmitEditing={onSubmit}
      />
      {error ? <InfoBanner tone="danger" message={error} /> : null}
      <Button
        title={t("auth.sendCode")}
        onPress={onSubmit}
        loading={loading}
        fullWidth
      />
    </YStack>
  );
};
