import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { YStack } from "tamagui";

import { useSendOtp, useVerifyOtp } from "@/services/auth/useAuth";
import { useSessionStore } from "@/store/sessionStore";
import { Screen } from "@/ui-kit/Screen";
import { Typography } from "@/ui-kit/Typography";
import { OTP_CODE_LENGTH } from "@/utils/constants";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { isValidPhone, normalizePhone } from "@/utils/phone";

import { CodeStep } from "./CodeStep";
import { LoginKeyboardView } from "./LoginScreenStyles";
import type { LoginStep } from "./LoginScreenTypes";
import { PhoneStep } from "./PhoneStep";

export const LoginScreen = () => {
  const { t } = useTranslation();
  const setSession = useSessionStore((state) => state.setSession);
  const sendOtp = useSendOtp();
  const verifyOtp = useVerifyOtp();

  const [step, setStep] = useState<LoginStep>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [validationError, setValidationError] = useState<string>();

  const normalizedPhone = normalizePhone(phone);
  const genericError = t("common.errors.generic");

  const handleSendCode = () => {
    if (!isValidPhone(phone)) {
      setValidationError(t("auth.errors.phone"));
      return;
    }

    setValidationError(undefined);
    sendOtp.mutate(
      { body: { phone: normalizedPhone, client: "mobile" } },
      { onSuccess: () => setStep("code") }
    );
  };

  const handleSignIn = () => {
    if (code.length < OTP_CODE_LENGTH) {
      setValidationError(t("auth.errors.code"));
      return;
    }

    setValidationError(undefined);
    verifyOtp.mutate(
      { body: { phone: normalizedPhone, code } },
      { onSuccess: (session) => setSession(session) }
    );
  };

  const handleChangePhone = () => {
    setCode("");
    setValidationError(undefined);
    verifyOtp.reset();
    setStep("phone");
  };

  const phoneError =
    validationError ??
    (sendOtp.isError
      ? getErrorMessage(sendOtp.error, genericError)
      : undefined);
  const codeError =
    validationError ??
    (verifyOtp.isError
      ? getErrorMessage(verifyOtp.error, genericError)
      : undefined);

  return (
    <Screen>
      <LoginKeyboardView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <YStack gap="$2">
          <Typography variant="screenTitle">{t("auth.title")}</Typography>
          <Typography tone="secondary">{t("auth.subtitle")}</Typography>
        </YStack>
        {step === "phone" ? (
          <PhoneStep
            phone={phone}
            error={phoneError}
            loading={sendOtp.isPending}
            onPhoneChange={setPhone}
            onSubmit={handleSendCode}
          />
        ) : (
          <CodeStep
            phone={normalizedPhone}
            code={code}
            error={codeError}
            loading={verifyOtp.isPending}
            onCodeChange={setCode}
            onSubmit={handleSignIn}
            onChangePhone={handleChangePhone}
          />
        )}
      </LoginKeyboardView>
    </Screen>
  );
};
