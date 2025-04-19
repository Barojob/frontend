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
    <div className="flex h-full w-full flex-col bg-main-1">
      <Header />
      <main className="flex-1 overflow-scroll">
        <div className="flex flex-col gap-7">
          {/* <AdList /> */}
          <div className="bg-gray-300 flex h-36 items-center justify-center">
            <MdImage className="text-gray-400 text-xl" />
          </div>
          <div className="mb-8 flex flex-col gap-6 px-6">
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
