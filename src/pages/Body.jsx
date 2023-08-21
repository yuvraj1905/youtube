import React from "react";
import { LeftSideBar } from "../components/LeftSideBar";
import { MainContent } from "./MainContent";

const Body = () => {
  return (
    <div className="w-[100%] box-border flex bg-black relative mt-[8vh]">
      <LeftSideBar />
      <MainContent />
    </div>
  );
};

export default Body;
