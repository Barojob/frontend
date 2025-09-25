import Button from "@/components/Button";
import EmployerContent from "@/components/MainPage/EmployerContent";
import WorkerContent from "@/components/MainPage/WorkerContent";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/hooks/useAuth";
import AlertIcon from "@/svgs/AlertIcon";
import BrandIcon from "@/svgs/BrandIcon";
import React from "react";

const MainPage: React.FC = () => {
  const { tempUser: user, setTempUserType } = useAuth();

  // 임시로 사용자 유형을 토글하는 함수
  const toggleUserType = () => {
    const newUserType = user?.type === "worker" ? "employer" : "worker";
    if (newUserType) {
      setTempUserType(newUserType);
    }
  };

  if (!user) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 p-4">
        <div className="flex w-full max-w-xs gap-4">
          <Button
            onClick={() => setTempUserType("worker")}
            theme="primary"
            size="xl"
            block
          >
            근로자로 시작
          </Button>
          <Button
            onClick={() => setTempUserType("employer")}
            theme="secondary"
            size="xl"
            block
          >
            구인자로 시작
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-main-1 safe-area-top safe-area-bottom h-full">
      <div className="safe-area-top bg-main-1 fixed left-0 right-0 top-0 z-20 px-6 backdrop-blur-sm">
        <div className="flex items-center justify-between py-6">
          <BrandIcon className="max-w-37" />
          <AlertIcon isAlert={true} />
        </div>
      </div>

      <main className="overflow-y-auto px-6 pb-20 pt-20">
        {user.type === "worker" ? <WorkerContent /> : <EmployerContent />}
        <div className="mb-4">
          <Button onClick={toggleUserType} theme="secondary" size="sm" block>
            🧪 현재: {user.type} |{" "}
            {user.type === "worker" ? "구인자" : "근로자"}로 변경
          </Button>
        </div>
      </main>

      <NavBar className="fixed bottom-0 left-0 right-0" />
    </div>
  );
};

export default MainPage;
