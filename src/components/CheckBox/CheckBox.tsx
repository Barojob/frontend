import React from "react";
import OptionCheckBox from "./OptionCheckBox";

type Props = {
  className?: string;
  isChecked?: boolean;
  onToggle: () => void;
  label?: string;
};

/**
 * @deprecated 이 컴포넌트는 호환성을 위해 유지됩니다.
 * 새로운 프로젝트에서는 BaseCheckBox, CheckBoxWithLabel, 또는 OptionCheckBox를 사용하세요.
 */
const CheckBox: React.FC<Props> = ({
  className,
  isChecked,
  onToggle,
  label,
}) => {
  if (!label) {
    // label이 없으면 빈 문자열로 처리
    return null;
  }

  return (
    <OptionCheckBox
      className={className}
      isChecked={isChecked}
      onChange={() => onToggle()}
      label={label}
      onView={() => {}} // 기본 보기 버튼 기능
    />
  );
};

export default CheckBox;
