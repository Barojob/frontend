import { cn } from "../../utils/classname";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "max-w-[600px] flex-1 w-full justify-center px-[6%] flex flex-col items-center box-border shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
};
export default Layout;
