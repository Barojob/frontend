import AdList from "@/component/Advertisement/AdList";
import NoticeBoard from "@/component/Board/NoticeBoard";
import SearchBoard from "@/component/Board/SearchBoard";
import Header from "@/component/layouts/Header";
import NavBar from "@/component/layouts/NavBar";
import React from "react";

type Props = {
  className?: string;
};

const MainPage: React.FC<Props> = () => {
  return (
    <div className="bg-gray-100 h-full w-full flex flex-col ">
      <Header />
      <main className="flex-1 overflow-scroll">
        <div className="flex flex-col gap-12 ">
          <AdList />
          <div className="px-6 flex flex-col gap-6">
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

/*
      { <Header className="" />
      <main className="flex-1 pt-20">
        <AdList />
        <SearchBoard />
        <NoticeBoard />
      </main>
      <NavBar className="" /> }
*/
