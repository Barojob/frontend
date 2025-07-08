import React, { useEffect, useState } from "react";
import { cn } from "../../utils/classname";
import { CircleCheckBoxWithLabel, OptionCheckBox } from "./index";

type CheckItem = {
  id: number;
  label: string;
  checked: boolean;
  required: boolean;
  content?: string; // 약관 상세 내용
};

type Props = {
  className?: string;
  onAllCheckedChange: (allRequiredChecked: boolean) => void;
};

const CheckList: React.FC<Props> = ({ className, onAllCheckedChange }) => {
  const [items, setItems] = useState<CheckItem[]>([
    {
      id: 1,
      label: "바로잡 서비스 이용약관 동의",
      checked: false,
      required: true,
      content:
        "바로잡 서비스 이용약관\n\n제1조 (목적)\n본 약관은 바로잡에서 제공하는 서비스의 이용조건 및 절차, 이용자와 회사의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다...",
    },
    {
      id: 2,
      label: "개인정보 수집 및 이용 동의",
      checked: false,
      required: true,
      content:
        "개인정보 수집 및 이용 동의\n\n1. 개인정보의 수집 및 이용 목적\n- 회원 가입 및 관리\n- 서비스 제공 및 업무처리\n- 고객 상담 및 불만처리...",
    },
    {
      id: 3,
      label: "개인정보 수집 및 이용 동의",
      checked: false,
      required: false,
      content:
        "개인정보 수집 및 이용 동의 (선택)\n\n1. 수집하는 개인정보의 항목\n- 선택정보: 관심분야, 취미 등\n2. 이용 목적\n- 맞춤형 서비스 제공\n- 이벤트 및 프로모션 안내...",
    },
    {
      id: 4,
      label: "개인정보 제3자 제공 동의",
      checked: false,
      required: false,
      content:
        "개인정보 제3자 제공 동의\n\n1. 제공받는 자: 제휴 파트너사\n2. 제공하는 개인정보 항목: 이름, 연락처\n3. 제공받는 자의 이용목적: 서비스 제공 및 상담\n4. 보유 및 이용기간: 서비스 종료 시까지...",
    },
    {
      id: 5,
      label: "마케팅 정보 수신 동의",
      checked: false,
      required: false,
      content:
        "마케팅 정보 수신 동의\n\n1. 수신 방법: 이메일, SMS, 앱 푸시\n2. 수신 내용\n- 신규 서비스 및 이벤트 정보\n- 맞춤형 채용정보\n- 할인 혜택 및 프로모션...",
    },
  ]);

  const isAllChecked = items.every((item) => item.checked);

  // 필수 항목이 모두 체크되었는지 확인
  const isRequiredChecked = items
    .filter((item) => item.required)
    .every((item) => item.checked);

  useEffect(() => {
    onAllCheckedChange(isRequiredChecked);
  }, [isRequiredChecked, onAllCheckedChange]);

  const toggleAll = () => {
    setItems(items.map((item) => ({ ...item, checked: !isAllChecked })));
  };

  const toggleItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const handleViewItem = (item: CheckItem) => {
    // 모달이나 새 페이지로 상세 내용 표시
    alert(`${item.label}\n\n${item.content}`);
  };

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {/* 전체 선택 체크박스 (원형) */}
      <CircleCheckBoxWithLabel
        isChecked={isAllChecked}
        onChange={toggleAll}
        label="전체 동의하기"
        size="md"
      />

      {/* 개별 체크박스들 (옵션 형태 - 보기 버튼 포함) */}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <OptionCheckBox
            key={item.id}
            isChecked={item.checked}
            onToggle={() => toggleItem(item.id)}
            onView={() => handleViewItem(item)}
            label={
              item.required ? `[필수] ${item.label}` : `[선택] ${item.label}`
            }
            showViewButton={true}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckList;
