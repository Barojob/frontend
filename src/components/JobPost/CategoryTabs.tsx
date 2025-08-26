import React from "react";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
  className = "",
}) => {
  const categories = [
    { id: "general", label: "보통 인부" },
    { id: "skilled", label: "기능공" },
  ];

  return (
    <div className={`flex ${className}`}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`w-full rounded-l-[0.625rem] px-8 py-2 text-lg font-medium transition-all duration-200 last:rounded-l-none last:rounded-r-[0.625rem] ${
            activeCategory === category.id
              ? "border border-blue-600 bg-blue-100 text-blue-600"
              : "border border-gray-200 bg-gray-50 text-gray-400"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
