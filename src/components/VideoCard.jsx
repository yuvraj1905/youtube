import React, { useEffect, useState } from "react";
import { DurationCalculator } from "../utils/DurationCalculator";
import { CiMenuKebab } from "react-icons/ci";
import { PROFILE_PICTURE_FETCHER } from "../utils/apiCalls";

const VideoCard = ({ data }) => {
  const { contentDetails, snippet, statistics } = data;
  const {
    categoryId,
    channelId,
    channelTitle,
    publishedAt,
    thumbnails: {
      standard: { url, height, width },
    },
    tags,
    title,
    description,
  } = snippet;
  const { duration } = contentDetails;
  const [profilePicture, setProfilePicture] = useState("");
  const { commentCount, favoriteCount, likeCount, viewCount } = statistics;

  useEffect(() => {
    async function temp() {
      const profilePicture = await PROFILE_PICTURE_FETCHER(channelId);
      setProfilePicture(profilePicture);
    }
    temp();
  }, []);

  return (
    <div className="w-[30%]  h-[45vh] relative flex flex-col text-white ">
      <section className="relative h-[65%] w-['100%'] ">
        <img
          src={url}
          alt=""
          className="cursor-pointer w-full h-full object-cover  rounded-xl"
        />
        <small className="bg-black absolute right-2 bottom-2 px-2 py-[2px] rounded-md">
          {DurationCalculator(duration)}
        </small>
      </section>
      <section className="flex p-2 h-[35%] w-[100%] relative items-start gap-2 py-4 border-1">
        <span className="flex-shrink-0 flex-grow-0 flex w-[10%] relative h-[40%] ">
          <img
            src={profilePicture}
            className=" h-[100%] rounded-full object-contain"
            alt=""
          />
        </span>
        <span className="w-[85%]">
          <h3 className="">{title}</h3>
        </span>
        <CiMenuKebab size={18} className=" self-start" />
      </section>
    </div>
  );
};

export default VideoCard;
