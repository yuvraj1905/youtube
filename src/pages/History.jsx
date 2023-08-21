import React from "react";
import { LeftSideBar } from "../components/LeftSideBar";
import { useSelector } from "react-redux";
import VideoCard from "../components/VideoCard";
import { AiOutlineDelete } from "react-icons/ai";

const History = () => {
  const history = useSelector((store) => store.library.history);
  const sideBarOpen = useSelector((store) => store.app.sideBarOpen);

  const classNameString = !sideBarOpen
    ? `bg-black box-border w-[92%] py-4 px-8 ml-[8%] min-h-[92vh] relative  `
    : `bg-black box-border w-[85%] py-4 px-8 ml-[15%] min-h-[92vh] relative  `;

  return (
    <div className="w-[100%] box-border flex  bg-black relative mt-[8vh]">
      <LeftSideBar />

      {history?.length > 0 ? (
        <>
          <section
            className={` ${classNameString} flex flex-col  gap-2 justify-start items-center overflow-hidden pt-6 relative`}
          >
            <h1 className="text-white self-start ml-16 font-bold text-3xl mb-2  pb-2 border-b-2 w-[30%] border-stone-400 ">
              Watch History
            </h1>
            <span className=" self-start ml-[3.75rem] text-white flex px-4 py-2 items-center gap-2  bg-stone-800 hover:bg-stone-700 rounded-full mb-4">
              <AiOutlineDelete size={18} />
              <button className="font-semibold">Clear history</button>
            </span>
            {history?.map((video) => (
              <VideoCard
                data={video}
                key={video.id}
                searchFeedVideo
                historyCard
              />
            ))}
          </section>
        </>
      ) : (
        <div
          className={`w-[100%] ${classNameString} flex flex-col gap-2 justify-between overflow-hidden pt-6`}
        >
          <h1 className="text-white ">No history available </h1>
        </div>
      )}
    </div>
  );
};

export default History;
