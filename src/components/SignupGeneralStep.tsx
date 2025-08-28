import { cn } from "@/utils/classname";
import React from "react";

type Props = {
  className?: string;
  title: string;
  description: string;
};

const SignupGeneralStep: React.FC<Props> = ({
  className,
  title,
  description,
}) => (
  <div className={cn("text-center", className)}>
    <h2 className="text-xl font-bold">{title}</h2>
    <p>{description}</p>
  </div>
);

export default SignupGeneralStep;
