import NoticeBoard from "@/components/Board/NoticeBoard";
import SearchBoard from "@/components/Board/SearchBoard";
import Header from "@/components/layouts/Header";
import NavBar from "@/components/layouts/NavBar";
import React from "react";
import { MdImage } from "react-icons/md";

type Props = {
  className?: string;
};

const MainPage: React.FC<Props> = () => {
  return (
    <div className="bg-main-1 flex h-full w-full flex-col">
      <Header />
      <main className="flex-1 overflow-scroll">
        <div className="flex flex-col gap-7">
          {/* <AdList /> */}
          <div className="flex h-36 items-center justify-center bg-gray-300">
            <MdImage className="text-xl text-gray-400" />
          </div>
          <div className="mb-8 flex flex-col gap-6 px-6">
            <SearchBoard
              title="일자리 요청하기"
              time="3시간"
              onClick={() => {}}
            />
            <NoticeBoard />

            {/* <div className="flex flex-col gap-4 items-center">
              <h3 className="text-lg font-semibold">컴포넌트 테스트</h3>
              
              
              <div className="w-full max-w-xs">
                <Button variant="blue">
                  다음
                </Button>
              </div>
              
              <BoxButton 
                name="근로자"
                variant="primary"
              />
            </div>  */}
          </div>
        </div>
      </main>
      <NavBar />
    </div>
  );
};

export default MainPage;
