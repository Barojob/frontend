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
  return (
    <OptionCheckBox
      className={className}
      isChecked={isChecked}
      onToggle={onToggle}
      label={label}
      showViewButton={true}
    />
  );
};

export default CheckBox;
