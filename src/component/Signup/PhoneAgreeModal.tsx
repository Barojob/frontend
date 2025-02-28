import React, { useState, useEffect } from "react";
import ModalWrapper from "../ModalWrapper";
import CircleCheckBox from "../CheckBox/CircleCheckBox";
import CheckBox from "../CheckBox/CheckBox";
import Button from "../Button/Button";

type CheckItem = {
  id: number;
  label: string;
  checked: boolean;
  required: boolean;
};

type PhoneAgreeModalProps = {
  setPhoneAgree: (phoneAgree: boolean) => void;
  setShowPhoneAgreeModal: (show: boolean) => void;
  onAllCheckedChange: (allRequiredChecked: boolean) => void;
  className?: string;
};

const PhoneAgreeModal: React.FC<PhoneAgreeModalProps> = ({
  className,
  setPhoneAgree,
  setShowPhoneAgreeModal,
  onAllCheckedChange,
}) => {
  const [items, setItems] = useState<CheckItem[]>([
    {
      id: 1,
      label: "본인확인서비스 이용 약관 동의",
      checked: false,
      required: true,
    },
    {
      id: 2,
      label: "개인정보 수집/이용/취급 위탁 동의",
      checked: false,
      required: true,
    },
    {
      id: 3,
      label: "고유식별정보처리 동의",
      checked: false,
      required: true,
    },
    {
      id: 4,
      label: "통신사 이용약관",
      checked: false,
      required: true,
    },
  ]);

  const isAllChecked = items.every((item) => item.checked);
  const isRequiredChecked = items
    .filter((item) => item.required)
    .every((item) => item.checked);

  useEffect(() => {
    onAllCheckedChange(isRequiredChecked);
  }, [isRequiredChecked, onAllCheckedChange]);

  const toggleAll = () => {
    setItems((prev) =>
      prev.map((item) => ({ ...item, checked: !isAllChecked }))
    );
  };

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleClose = (complete: boolean = false) => {
    if (!complete) {
      setPhoneAgree(false);
    }
    setShowPhoneAgreeModal(false);
  };

  return (
    <ModalWrapper onClose={() => handleClose()} className={className}>
      <div className="text-xl mb-8 text-center font-black">
        휴대폰 본인확인 약관 동의
      </div>
      <CircleCheckBox
        isChecked={isAllChecked}
        onToggle={toggleAll}
        label="전체 동의하기"
      />
      <div className="flex flex-col mt-5 mb-11">
        {items.map((item) => (
          <div key={item.id} className="mb-3.5">
            <CheckBox
              isChecked={item.checked}
              onToggle={() => toggleItem(item.id)}
              label={
                item.required ? `[필수] ${item.label}` : `[선택] ${item.label}`
              }
            />
          </div>
        ))}
      </div>
      <Button
        className={`absolute bottom-0 left-0 rounded-none w-full py-4 bg-blue-500 border-blue-500 text-white font-normal ${
          !isRequiredChecked ? "opacity-50" : ""
        }`}
        onClick={() => {
          if (isRequiredChecked) {
            setPhoneAgree(true);
            handleClose(true);
          }
        }}
        disabled={!isRequiredChecked}
      >
        다음
      </Button>
    </ModalWrapper>
  );
};

export default PhoneAgreeModal;
