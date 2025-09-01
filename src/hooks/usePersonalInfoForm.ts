import useSignupContext from "@/hooks/useSignupContext";
import { Carrier } from "@/types/signup";
import { formatPhoneNumber } from "@/utils/formatters";

export const usePersonalInfoForm = () => {
  const {
    personalInfoState: [personalInfo, setPersonalInfo],
  } = useSignupContext();

  const isValidName = personalInfo.name.length >= 2;
  const isValidBirthDate = personalInfo.birthDate.length === 8;
  const isValidCarrier = !!personalInfo.carrier;
  const isValidPhoneNumber =
    personalInfo.phoneNumber.replace(/[^0-9]/g, "").length === 11;
  const isValidForm =
    isValidName && isValidBirthDate && isValidCarrier && isValidPhoneNumber;

  return {
    isValidForm,
    nameField: {
      isValid: isValidName,
      value: personalInfo.name,
      onChange: (value: string) =>
        setPersonalInfo((prev) => ({ ...prev, name: value })),
    },
    birthDateField: {
      isValid: isValidBirthDate,
      value: personalInfo.birthDate,
      onChange: (value: string) =>
        setPersonalInfo((prev) => ({
          ...prev,
          birthDate: value.replace(/[^0-9]/g, "").slice(0, 8),
        })),
    },
    carrierField: {
      isValid: isValidCarrier,
      value: personalInfo.carrier,
      onChange: (carrier: Carrier) =>
        setPersonalInfo((prev) => ({ ...prev, carrier })),
    },
    phoneNumberField: {
      isValid: isValidPhoneNumber,
      value: personalInfo.phoneNumber,
      onChange: (value: string) => {
        const formattedValue = formatPhoneNumber(value);
        setPersonalInfo((prev) => ({ ...prev, phoneNumber: formattedValue }));
      },
    },
  };
};
