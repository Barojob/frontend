import { useState, useEffect } from "react";
import { cn } from "../../utils/classname";
import CheckBox from "./CheckBox";
import CircleCheckBox from "./CircleCheckBox";

type CheckItem = {
  id: number;
  label: string;
  checked: boolean;
};

type Props = {
  className?: string;
  onAllCheckedChange: (allChecked: boolean) => void;
};

const CheckList: React.FC<Props> = ({ className, onAllCheckedChange }) => {
  const [items, setItems] = useState<CheckItem[]>([
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
      <div className="gap-3 flex flex-col">
        {items.map((item) => (
          <CheckBox
            key={item.id}
            isChecked={item.checked}
            onToggle={() => toggleItem(item.id)}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckList;
