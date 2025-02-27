import { useState, useEffect } from "react";
import { cn } from "../../utils/classname";
import CheckBox from "./CheckBox";
import CircleCheckBox from "./CircleCheckBox";

type CheckItem = {
  id: number;
  label: string;
  checked: boolean;
  required: boolean;
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

  // 다음 버튼 활성화는 필수 항목만 체크되었는지를 기준으로 합니다.

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
      <div className="flex flex-col">
        {items.map((item) => (
          <div key={item.id} className="mb-3.5">
            <CheckBox
              key={item.id}
              isChecked={item.checked}
              onToggle={() => toggleItem(item.id)}
              label={
                item.required ? `[필수] ${item.label}` : `[선택] ${item.label}`
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckList;
