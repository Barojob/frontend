import NoticeBoard from "@/component/Board/NoticeBoard";
import SearchBoard from "@/component/Board/SearchBoard";
import Header from "@/component/layouts/Header";
import NavBar from "@/component/layouts/NavBar";
import React from "react";
import { MdImage } from "react-icons/md";

type Props = {
  className?: string;
};

const MainPage: React.FC<Props> = () => {
  return (
    <div className="bg-main-1 h-full w-full flex flex-col ">
      <Header />
      <main className="flex-1 overflow-scroll">
        <div className="flex flex-col gap-7 ">
          {/* <AdList /> */}
          <div className="h-36 bg-gray-300 flex items-center justify-center">
            <MdImage className="text-gray-400 text-xl" />
          </div>
          <div className="px-6 flex flex-col gap-6 mb-8">
            <SearchBoard />
            <NoticeBoard />
          </div>
        </div>
      </main>
      <NavBar />
    </div>
  );
};

export default MainPage;
