import { cn } from "../utils/classname";

type Props = {
  className?: string;
};

const DirectMatchIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={cn("size-4", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 15"
      fill="none"
    >
      <path
        d="M16 0.324121V0.558531L10.3671 14.5093C10.265 14.7358 10.2354 14.8939 9.96875 15H9.71875L9.49917 14.8689L6.88 9.18944L12.3283 4.0739C12.7538 3.60782 12.1517 3.04508 11.6558 3.44346L6.19833 8.55078L0.14 6.09554L0 5.8897V5.65529L0.1575 5.43692L15.3808 0.0220098C15.6663 -0.0586054 15.8842 0.0912763 16 0.324121Z"
        fill="#247AF2"
      />
    </svg>
  );
};

export default DirectMatchIcon;
