import NavBar from "@/components/NavBar";
import { BellIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import JobRequestCard from "../components/JobRequestCard";
import MainCarousel from "../components/MainCarousel";
import UrgentRecruitmentCard from "../components/UrgentRecruitmentCard";
import BrandIcon from "../svgs/BrandIcon";
import { cn } from "../utils/classname";

const MainPage: React.FC = () => {
  return (
    <div className="bg-main-1 h-full px-6">
      <div className="flex items-center justify-between py-6">
        <BrandIcon className="max-w-37" />
        <BellIcon className="size-7.5 text-blue-1" />
      </div>

      <MainCarousel className="h-33 -mx-6" />

      <div className="mt-8">
        <MainHeading title="경기 포천시" />
        <Link to="/job-request">
          <JobRequestCard className="mt-3" />
        </Link>
      </div>

      <div className="mt-8">
        <MainHeading title="긴급 모집중" />
        <UrgentRecruitmentCard className="h-30 mt-3" />
      </div>

      <NavBar className="fixed bottom-0 left-0 right-0" />
    </div>
  );
};

const MainHeading: React.FC<{ className?: string; title: string }> = ({
  className,
  title,
}) => {
  return (
    <div className={cn("flex items-center gap-x-1", className)}>
      <h2 className="font-bold text-[#494B4F]">{title}</h2>
      <ChevronRightIcon className="stroke-4 size-3 text-[#6B7684]" />
    </div>
  );
};

export default MainPage;
