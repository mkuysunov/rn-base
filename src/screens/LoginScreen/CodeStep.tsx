import { useTranslation } from "react-i18next";
import { YStack } from "tamagui";

import { Button } from "@/ui-kit/Button";
import { Field } from "@/ui-kit/Field";
import { InfoBanner } from "@/ui-kit/InfoBanner";
import { OTP_CODE_LENGTH } from "@/utils/constants";

interface CodeStepProps {
  phone: string;
  code: string;
  error?: string;
  loading: boolean;
  onCodeChange: (value: string) => void;
  onSubmit: () => void;
  onChangePhone: () => void;
}

export const CodeStep = (props: CodeStepProps) => {
  const { phone, code, error, loading, onCodeChange, onSubmit, onChangePhone } =
    props;
  const { t } = useTranslation();

  return (
    <YStack gap="$4">
      <Field
        label={t("auth.codeLabel")}
        placeholder={t("auth.codePlaceholder")}
        helper={t("auth.codeSentTo", { phone })}
        value={code}
        onChangeText={onCodeChange}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={OTP_CODE_LENGTH}
        returnKeyType="done"
        onSubmitEditing={onSubmit}
      />
      {error ? <InfoBanner tone="danger" message={error} /> : null}
      <Button
        title={t("auth.signIn")}
        onPress={onSubmit}
        loading={loading}
        fullWidth
      />
      <Button
        title={t("auth.changePhone")}
        variant="ghost"
        size="md"
        onPress={onChangePhone}
        disabled={loading}
      />
    </YStack>
  );
};
