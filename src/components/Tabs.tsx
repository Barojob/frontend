import { cn } from "@/utils/classname";

type TabsProps<T extends string> = {
  tabs: readonly T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
};

const Tabs = <T extends string>({
  tabs,
  activeTab,
  onTabChange,
}: TabsProps<T>) => {
  return (
    <nav className="flex border-b border-gray-200 bg-white">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "flex-1 py-3 text-center font-semibold transition-colors",
            activeTab === tab
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-400 hover:text-gray-600",
          )}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default Tabs;
