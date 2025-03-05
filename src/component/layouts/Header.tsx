import React from "react";
import { cn } from "../../utils/classname";
import Logo from "../../svgs/Logo";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

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
      <Button
        onClick={() => navigate("/home")}
        className="w-fit rounded-lg text-gray-1 text-sm px-2.5 py-1.5"
      >
        로그인/가입
      </Button>
    </div>
  );
};

export default Header;
