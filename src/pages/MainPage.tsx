import React from "react";
import { cn } from "../utils/classname";
import Layout from "../component/layouts/Layout";
import Header from "../component/layouts/Header";
import NavBar from "../component/layouts/NavBar";
import AdList from "../component/Advertisement/AdList";

type Props = {
  className?: string;
};

const MainPage: React.FC<Props> = ({ className }) => {
  return (
    <Layout className={cn("flex flex-1 relative bg-main-1", className)}>
      <Header className="absolute top-0" />
      <AdList className="absolute top-16 h-36" />
      <NavBar className="absolute bottom-0 left-0" />
    </Layout>
  );
};

export default MainPage;
