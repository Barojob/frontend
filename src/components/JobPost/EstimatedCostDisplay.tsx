import React from "react";

interface EstimatedCostDisplayProps {
  minCost: number;
  maxCost: number;
}

const EstimatedCostDisplay: React.FC<EstimatedCostDisplayProps> = ({
  minCost,
  maxCost,
}) => {
  return (
    <div className="pb-20">
      <div className="text-2xl font-bold text-neutral-600">예상 금액</div>
      <div className="mt-3">
        <div className="rounded-lg bg-gray-100 px-4 py-3 text-center">
          <div className="text-lg font-bold text-neutral-600">
            최소{" "}
            <span className="text-red-400">{minCost.toLocaleString()}원</span> -
            최대{" "}
            <span className="text-indigo-600">
              {maxCost.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatedCostDisplay;
