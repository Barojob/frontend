import React from "react";
import { cn } from "../../utils/classname";
import Logo from "../../svgs/Logo";

type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn("flex justify-center items-center w-full h-14", className)}
    >
      <Logo />
    </div>
  );
};

export default Header;
