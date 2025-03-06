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
        "flex justify-between items-center w-full h-14 px-6",
        className
      )}
    >
      <Logo />
      <div
        onClick={() => navigate("/home")}
        className="w-fit rounded-lg bg-white border text-gray-1 text-xs px-2.5 py-1.5 flex items-center gap-0.5"
      >
        <div className=" p-1 rounded-full">
          <IoPerson className="text-[10px] text-gray-400" />
        </div>
        로그인
      </div>
    </div>
  );
};

export default Header;
