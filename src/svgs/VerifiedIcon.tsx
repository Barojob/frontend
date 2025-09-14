import { cn } from "@/utils/classname";
import verifiedIcon from "/public/images/VerifiedIcon.svg";

type Props = {
  className?: string;
};

const VerifiedIcon: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <img src={verifiedIcon} alt="verified" />
    </div>
  );
};

export default VerifiedIcon;
