import React from "react";
import { cn } from "../../utils/classname";
import Board from "./Board";
import RightArrowIcon from "../../svgs/RightArrowIcon";
import NoticeCard from "../Notice/NoticeCard";

type Props = {
  className?: string;
};

const item = [
  {
    date: "09월 18일 (수) 오전 6:40",
    location: "경기도 용인시 동천역 자이르네 (철거)",
    workerType: "보통인부",
    wage: 140700,
  },
  {
    date: "09월 18일 (수) 오전 6:40",
    location: "경기도 용인시 동천역 자이르네 (철거)",
    workerType: "보통인부",
    wage: 140700,
  },
  {
    date: "09월 18일 (수) 오전 6:40",
    location: "경기도 용인시 동천역 자이르네 (철거)",
    workerType: "보통인부",
    wage: 140700,
  },
  {
    date: "09월 18일 (수) 오전 6:40",
    location: "경기도 용인시 동천역 자이르네 (철거)",
    workerType: "보통인부",
    wage: 140700,
  },
];

const NoticeBoard: React.FC<Props> = ({ className }) => {
  return (
    <Board
      className={cn("flex flex-col justify-center gap-[1.125rem]", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="font-semibold text-xl text-gray-3 leading-none">
            선착순 공고
          </div>
          <RightArrowIcon className="ml-3" />
        </div>
        <button className="bg-gray-5 border-gray-5 rounded-[0.625rem] text-[0.688rem] font-semibold text-gray-4 leading-none px-3 py-[0.313rem]">
          더보기
        </button>
      </div>
      <div className="flex flex-col gap-[0.625rem]">
        {item.map((index) => (
          <NoticeCard
            date={index.date}
            location={index.location}
            workerType={index.workerType}
            wage={index.wage}
          />
        ))}
      </div>
    </Board>
  );
};
export default NoticeBoard;
