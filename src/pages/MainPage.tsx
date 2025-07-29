import NoticeBoard from "@/components/Board/NoticeBoard";
import SearchBoard from "@/components/Board/SearchBoard";
import Header from "@/components/layouts/Header";
import NavBar from "@/components/layouts/NavBar";
import { useUserType } from "@/hooks/useUserType";
import React from "react";
import { MdImage } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {
  className?: string;
};

const MainPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { userType, isWorker, isEmployer } = useUserType();

  return (
    <div className="bg-main-1 flex h-full w-full flex-col">
      <Header />
      <main className="flex-1 overflow-scroll">
        <div className="flex flex-col gap-7">
          <div className="flex h-36 items-center justify-center bg-gray-300">
            <MdImage className="text-xl text-gray-400" />
          </div>
          <div className="mb-8 flex flex-col gap-6 px-6">
            {(!userType || isWorker) && (
              <>
                <SearchBoard
                  title="일자리 요청하기"
                  time="3시간"
                  onClick={() => {}}
                />
                <NoticeBoard />
              </>
            )}

            {isEmployer && (
              <SearchBoard
                title="근로자 요청하기"
                time="3시간"
                onClick={() => {
                  navigate("/job-posting");
                }}
              />
            )}
          </div>
        </div>
      </main>
      <NavBar />
    </div>
  );
};

export default MainPage;
