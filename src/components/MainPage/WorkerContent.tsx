import Button from "@/components/Button";
import JobRequestCard from "@/components/JobRequestCard";
import MainCarousel from "@/components/MainCarousel";
import MainHeading from "@/components/MainPage/MainHeading";
import UrgentRecruitmentCard from "@/components/UrgentRecruitmentCard";
import React from "react";
import { Link } from "react-router-dom";

const WorkerContent: React.FC = () => {
  return (
    <>
      <MainCarousel className="h-33 -mx-6" />

      {/* 테스트용 버튼 (공통 UI) */}
      <div className="mt-6">
        <Link to="/intro">
          <Button theme="primary" size="sm" block>
            🧪 테스트: Intro 페이지로 이동
          </Button>
        </Link>
      </div>
      <div className="mt-6">
        <Link to="/worker-detail">
          <Button theme="primary" size="sm" block>
            🧪 테스트: 출퇴근 범위 설정 페이지로 이동
          </Button>
        </Link>
      </div>

      {/* 근로자 전용 섹션 */}
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
    </>
  );
};

export default WorkerContent;
