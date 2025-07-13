import React from "react";
import { IoPerson } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "../../svgs/Logo";
import { cn } from "../../utils/classname";

type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex h-14 w-full items-center justify-between px-6",
        className,
      )}
    >
      <Logo />
      <Link
        to="/intro"
        className="text-gray-1 flex w-fit items-center gap-0.5 rounded-lg border bg-white px-2.5 py-1.5 text-xs"
      >
        <div className="rounded-full p-1">
          <IoPerson className="text-[10px] text-gray-400" />
        </div>
        로그인
      </Link>
    </div>
  );
};

export default Header;
