import React, { useState } from "react";
import { cn } from "../../utils/classname";
import CheckBox from "../CheckBox";
import CircleCheckBox from "../CheckBox/CircleCheckBox";
import DeprecatedButton from "../DeprecatedButton/DeprecatedButton";
import Modal from "../Modal";

type CheckItem = {
  id: number;
  label: string;
  checked: boolean;
  required: boolean;
};

type PhoneAgreeModalProps = {
  className?: string;
  visible: boolean;
  onSuccess: () => void;
  onClose: () => void;
};

const PhoneAgreeModal: React.FC<PhoneAgreeModalProps> = ({
  className,
  visible,
  onSuccess,
  onClose,
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

  const isAllChecked = React.useMemo(
    () => items.every((item) => item.checked),
    [items],
  );
  const isRequiredChecked = React.useMemo(
    () => items.filter((item) => item.required).every((item) => item.checked),
    [items],
  );

  return (
    // FIXME: No design in Figma. Need to fix this.
    <Modal className={className} visible={visible} onClose={onClose}>
      <div className="mb-8 text-center text-xl font-black">
        휴대폰 본인확인 약관 동의
      </div>
      <CircleCheckBox
        className="size-6"
        label="전체 동의하기"
        isChecked={isAllChecked}
        onToggle={toggleAll}
      />
      <div className="mb-11 mt-5 flex flex-col">
        {items.map((item) => (
          <div key={item.id} className="mb-3.5">
            <CheckBox
              isChecked={item.checked}
              onToggle={() => toggleItem(item.id)}
              label={
                item.required ? `[필수] ${item.label}` : `[선택] ${item.label}`
              }
              className="mr-0.5 size-6"
            />
          </div>
        ))}
      </div>

      <DeprecatedButton
        className={cn(
          "w-full rounded-none border-blue-500 bg-blue-500 py-4 font-normal text-white disabled:opacity-50",
        )}
        disabled={!isRequiredChecked}
        onClick={handleContinue}
      >
        다음
      </DeprecatedButton>
    </Modal>
  );

  function handleContinue() {
    onSuccess();
    onClose();
  }

  function toggleAll() {
    setItems((prev) =>
      prev.map((item) => ({ ...item, checked: !isAllChecked })),
    );
  }

  function toggleItem(id: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  }
};

export default PhoneAgreeModal;
