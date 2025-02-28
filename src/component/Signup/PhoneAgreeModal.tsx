import React, { useState, useEffect } from "react";
import { cn } from "../../utils/classname";
import CircleCheckBox from "../CheckBox/CircleCheckBox";
import CheckBox from "../CheckBox/CheckBox";
import Button from "../Button/Button";

type CheckItem = {
  id: number;
  label: string;
  checked: boolean;
  required: boolean;
};

type Props = {
  className?: string;
  setPhoneAgree: (phoneAgree: boolean) => void;
  setShowPhoneAgreeModal: (show: boolean) => void;
  onAllCheckedChange: (allRequiredChecked: boolean) => void;
};

const PhoneAgreeModal: React.FC<Props> = ({
  className,
  setPhoneAgree,
  setShowPhoneAgreeModal,
  onAllCheckedChange,
}) => {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    // 배경 스크롤 방지
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 외부 클릭 시 모달 닫기
  const handleClose = (complete: boolean = false) => {
    setAnimate(false);
    setTimeout(() => {
      if (!complete) {
        setPhoneAgree(false);
      }
      setShowPhoneAgreeModal(false);
    }, 400); // exit 애니메이션 지속시간
  };

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

  return (
    <div
      className={cn("fixed inset-0 z-50", className)}
      onClick={() => handleClose()}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 max-w-[460px] mx-auto">
        <div
          className={cn(
            "bg-white rounded-t-[40px] py-8 px-6 w-full transition-transform duration-400 transform",
            animate ? "animate-slide-up" : "animate-slide-down"
          )}
          onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 외부 이벤트 전파 방지
        >
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
              // 외부 onClick 제거 – CheckBox 내부 onClick(onToggle)만 사용
              <div key={item.id} className="mb-3.5">
                <CheckBox
                  isChecked={item.checked}
                  onToggle={() => toggleItem(item.id)}
                  label={
                    item.required
                      ? `[필수] ${item.label}`
                      : `[선택] ${item.label}`
                  }
                />
              </div>
            ))}
          </div>
          <Button
            className={cn(
              "absolute bottom-0 left-0 rounded-none w-full py-4 bg-blue-500 border-blue-500 text-white font-normal",
              !isRequiredChecked ? "opacity-50 " : ""
            )}
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
        </div>
      </div>
    </div>
  );
};

export default PhoneAgreeModal;
