import Drawer from "@/components/Drawer";
import ArrowDownIcon from "@/svgs/DropdownArrowIcon";
import { Nullable } from "@/types/misc";
import { Carrier } from "@/types/signup";
import { cn } from "@/utils/classname";
import React, { useState } from "react";

type Props = {
  className?: string;
  value: Nullable<Carrier>;
  onSelect: (carrier: Carrier) => void;
};

const SelectCarrierDrawer: React.FC<Props> = ({
  className,
  value: carrier,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        className={cn(
          "flex items-center justify-between gap-x-3 rounded-lg bg-gray-100 px-4 py-3",
          className,
        )}
        type="button"
        onClick={handleToggleVisible(true)}
      >
        {carrier ?? "통신사"}
        <ArrowDownIcon className="size-3 text-blue-500" />
      </button>

      <Drawer
        title="통신사 선택"
        visible={visible}
        onClose={handleToggleVisible(false)}
      >
        <ul className="space-y-2">
          {Object.values(Carrier).map((option) => (
            <li key={option}>
              <button
                className="w-full rounded-lg border p-3 text-left hover:bg-gray-50"
                onClick={handleSelect(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );

  function handleToggleVisible(visible?: boolean) {
    return () => {
      setVisible((prev) => {
        return typeof visible === "boolean" ? visible : !prev;
      });
    };
  }

  function handleSelect(carrier: Carrier) {
    return () => {
      onSelect(carrier);
      setVisible(false);
    };
  }
};

export default SelectCarrierDrawer;
