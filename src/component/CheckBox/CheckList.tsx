import { useState, useEffect } from "react";
import { cn } from "../../utils/classname";
import CheckBox from "./CheckBox";
import CircleCheckBox from "./CircleCheckBox";

type CheckItem = {
  id: number;
  label: string;
  checked: boolean;
<<<<<<< HEAD
  required: boolean;
=======
>>>>>>> bea64eb (feat: 회원가입 페이지 구조 세팅 및 첫스텝 페이지 구현 완료.)
};

type Props = {
  className?: string;
<<<<<<< HEAD
  onAllCheckedChange: (allRequiredChecked: boolean) => void;
=======
  onAllCheckedChange: (allChecked: boolean) => void;
>>>>>>> bea64eb (feat: 회원가입 페이지 구조 세팅 및 첫스텝 페이지 구현 완료.)
};

const CheckList: React.FC<Props> = ({ className, onAllCheckedChange }) => {
  const [items, setItems] = useState<CheckItem[]>([
<<<<<<< HEAD
    {
      id: 1,
      label: "바로잡 서비스 이용약관 동의",
      checked: false,
      required: true,
    },
    {
      id: 2,
      label: "개인정보 수집 및 이용 동의",
      checked: false,
      required: true,
    },
    {
      id: 3,
      label: "개인정보 수집 및 이용 동의",
      checked: false,
      required: false,
    },
    {
      id: 4,
      label: "개인정보 제3자 제공 동의",
      checked: false,
      required: false,
    },
    {
      id: 5,
      label: "마케팅 정보 수신 동의",
      checked: false,
      required: false,
    },
  ]);

  const isAllChecked = items.every((item) => item.checked);
  // 다음 버튼 활성화는 필수 항목만 체크되었는지를 기준으로 합니다.

  const isRequiredChecked = items
    .filter((item) => item.required)
    .every((item) => item.checked);

  useEffect(() => {
    onAllCheckedChange(isRequiredChecked);
  }, [isRequiredChecked, onAllCheckedChange]);
=======
    { id: 1, label: "[필수] 바로잡 서비스 이용약관 동의", checked: false },
    { id: 2, label: "[필수] 개인정보 수집 및 이용 동의", checked: false },
    { id: 3, label: "[선택] 개인정보 수집 및 이용 동의", checked: false },
    { id: 4, label: "[선택] 개인정보 제3자 제공 동의", checked: false },
    { id: 5, label: "[선택] 마케팅 정보 수신 동의", checked: false },
  ]);

  const isAllChecked = items.every((item) => item.checked);

  useEffect(() => {
    onAllCheckedChange(isAllChecked);
  }, [isAllChecked, onAllCheckedChange]);
>>>>>>> bea64eb (feat: 회원가입 페이지 구조 세팅 및 첫스텝 페이지 구현 완료.)

  const toggleAll = () => {
    setItems(items.map((item) => ({ ...item, checked: !isAllChecked })));
  };

  const toggleItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {/* 전체 선택 체크박스 (동그란 형태) */}
      <CircleCheckBox
        isChecked={isAllChecked}
        onToggle={toggleAll}
        label="전체 동의하기"
      />

      {/* 개별 체크박스들 */}
<<<<<<< HEAD
      <div className="flex flex-col">
        {items.map((item) => (
          <button className="mb-3.5" onClick={() => toggleItem(item.id)}>
            <CheckBox
              key={item.id}
              isChecked={item.checked}
              onToggle={() => toggleItem(item.id)}
              label={
                item.required ? `[필수] ${item.label}` : `[선택] ${item.label}`
              }
            />
          </button>
=======
      <div className="gap-3 flex flex-col">
        {items.map((item) => (
          <CheckBox
            key={item.id}
            isChecked={item.checked}
            onToggle={() => toggleItem(item.id)}
            label={item.label}
          />
>>>>>>> bea64eb (feat: 회원가입 페이지 구조 세팅 및 첫스텝 페이지 구현 완료.)
        ))}
      </div>
    </div>
  );
};

export default CheckList;
