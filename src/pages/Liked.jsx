import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LeftSideBar } from "../components/LeftSideBar";
import VideoCard from "../components/VideoCard";

const Liked = () => {
  const likedVideos = useSelector((store) => store.library.likedVideos);
  const sideBarOpen = useSelector((store) => store.app.sideBarOpen);

  const classNameString = !sideBarOpen
    ? `bg-black box-border w-[92%] py-4 px-8 ml-[8%] min-h-[92vh] relative  `
    : `bg-black box-border w-[85%] py-4 px-8 ml-[15%] min-h-[92vh] relative  `;

  return (
    <div className="w-[100%] box-border flex  bg-black relative mt-[8vh]">
      <LeftSideBar />
      {likedVideos?.length > 0 ? (
        <section
          className={` ${classNameString} flex flex-col  gap-2 justify-start items-center overflow-hidden pt-6 relative`}
        >
          <h1 className="text-white self-start ml-16 font-bold text-3xl mb-6 pb-2 border-b-2 w-[30%] border-stone-400  ">
            Liked
            <small className="text-sm italic text-stone-300"> videos</small>
          </h1>
          {likedVideos?.map((video) => (
            <VideoCard
              data={video}
              key={video.id}
              searchFeedVideo
              likedVideosCard
            />
          ))}
        </section>
      ) : (
        <div
          className={`w-[100%] ${classNameString} flex flex-col gap-2 justify-between overflow-hidden pt-6`}
        >
          <h1 className="text-white ">No liked videos </h1>
        </div>
      )}
    </div>
  );
};

export default Liked;
