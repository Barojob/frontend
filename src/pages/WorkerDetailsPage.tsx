import Button from "@/components/Button";
import Modal from "@/components/Modal";
import NavigationHeader from "@/components/NavigationHeader";
import { EQUIPMENT_LIST, JOB_CATEGORIES, JobCategory } from "@/fixtures/jobs";
import { useWorkerDetails } from "@/hooks/useWorkerDetails";
import WarningIcon from "@/svgs/WarningIcon";
import { cn } from "@/utils/classname";
import { formatCurrency } from "@/utils/formatters";
import React from "react";

const WorkerDetailsPage: React.FC = () => {
  const {
    selectedCategory,
    selectedJobs,
    selectedEquipments,
    wageRange,
    showPreparingModal,
    setShowPreparingModal,
    handleCategorySelect,
    handleJobToggle,
    handleEquipmentToggle,
    handleSubmit,
  } = useWorkerDetails();

  const jobCategoryKeys = Object.keys(JOB_CATEGORIES) as JobCategory[];
  const showJobs = selectedCategory === "보통인부"; // "보통인부"일 때만 직무 표시
  const showEquipments = selectedJobs.length > 0;
  const showSubmitSection = selectedEquipments.length > 0;

  return (
    <div className="safe-area-top flex h-screen flex-col bg-white">
      <NavigationHeader
        className="px-6"
        title="일자리 요청하기"
        backTo="/commute-range"
      />

      <main className="flex-1 overflow-y-auto px-6">
        <h2 className="mt-4 text-2xl font-bold">
          원하시는 업무를 체크해주세요
        </h2>

        <div className="mt-6">
          <div className="relative flex overflow-hidden rounded-xl border border-gray-500">
            {jobCategoryKeys.map((category, index) => (
              <React.Fragment key={category}>
                <button
                  onClick={() => handleCategorySelect(category)}
                  className={cn(
                    "flex-1 px-6 py-3 text-center font-medium",
                    selectedCategory === category
                      ? "bg-blue-100 font-bold text-blue-600"
                      : "bg-white text-gray-400 hover:bg-gray-50",
                  )}
                >
                  {category}
                </button>
                {index < jobCategoryKeys.length - 1 && (
                  <div className="w-px bg-gray-500" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {showJobs && (
          <section className="animate-slide-up mt-8">
            <div className="grid grid-cols-4 gap-3">
              {JOB_CATEGORIES[selectedCategory].map((job) => (
                <button
                  key={job.id}
                  onClick={() => handleJobToggle(job.name)}
                  className={cn(
                    "rounded-lg px-3 py-3 text-center text-sm font-medium",
                    selectedJobs.includes(job.name)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200",
                  )}
                >
                  {job.name}
                </button>
              ))}
            </div>
          </section>
        )}

        {showEquipments && (
          <section className="animate-slide-up mt-10">
            <h3 className="text-2xl font-bold">
              사용가능한 장비를 체크해주세요
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {EQUIPMENT_LIST.map((equipment) => (
                <button
                  key={equipment.id}
                  onClick={() => handleEquipmentToggle(equipment.name)}
                  className={cn(
                    "rounded-lg px-4 py-2 text-center text-sm font-medium",
                    selectedEquipments.includes(equipment.name)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200",
                  )}
                >
                  {equipment.name}
                </button>
              ))}
            </div>
          </section>
        )}

        {showSubmitSection && (
          <section className="animate-slide-up mt-10 pb-10">
            <h3 className="text-2xl font-bold">예상 수령 금액</h3>
            <div className="mt-4 rounded-lg bg-gray-100 px-6 py-4">
              <div className="flex items-baseline justify-between text-xl font-bold">
                <span>
                  최소{" "}
                  <span className="text-orange-500">
                    {formatCurrency(wageRange.min)}원
                  </span>
                </span>
                <span>~</span>
                <span>
                  최대{" "}
                  <span className="text-blue-600">
                    {formatCurrency(wageRange.max)}원
                  </span>
                </span>
              </div>
            </div>
            <div className="my-8 text-center text-sm text-blue-600">
              <p>업무 내용에 따라 수령 금액이 달라집니다.</p>
              <p>정확한 수령 금액은 공고에서 확인해주세요.</p>
            </div>
            <button
              className="w-full rounded-lg bg-blue-600 py-3 text-lg font-bold text-white"
              onClick={handleSubmit}
            >
              18시에 알려드릴게요 매칭 등록
            </button>
          </section>
        )}
      </main>

      <Modal
        visible={showPreparingModal}
        onClose={() => setShowPreparingModal(false)}
      >
        <div className="px-8 py-10 text-center">
          <div className="mb-4 flex justify-center">
            <WarningIcon />
          </div>
          <h2 className="mb-1 text-2xl font-bold">앗!</h2>
          <h2 className="mb-3 text-2xl font-bold">서비스 준비 중이예요</h2>
          <p className="mb-8 text-xs font-medium text-gray-500">
            기능공 관련 기능은 현재 준비중입니다.
            <br />
            조금만 기다려주세요!
          </p>
          <Button
            onClick={() => setShowPreparingModal(false)}
            theme="primary"
            size="md"
            className="mx-auto w-full max-w-[200px]"
          >
            확인했어요
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default WorkerDetailsPage;
