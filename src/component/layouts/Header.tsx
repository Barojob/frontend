import React from "react";
import { cn } from "../../utils/classname";
import Logo from "../../svgs/Logo";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";

type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex h-14 w-full items-center justify-between px-6",
        className,
      )}
    >
      <Logo />
      <div
        onClick={() => navigate("/home")}
        className="flex w-fit items-center gap-0.5 rounded-lg border bg-white px-2.5 py-1.5 text-xs text-gray-1"
      >
        <div className="rounded-full p-1">
          <IoPerson className="text-[10px] text-gray-400" />
        </div>
        로그인
      </div>
    </div>
  );
};

export default Header;
