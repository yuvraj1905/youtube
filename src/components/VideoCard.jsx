import React, { useEffect, useState } from "react";
import {
  DurationCalculator,
  TimeCounter,
  ViewsCounter,
} from "../utils/CalculatorFunctions";
import { CiMenuKebab } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { FaShare } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { PROFILE_PICTURE_FETCHER } from "../utils/apiCalls";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ data, searchFeedVideo }) => {
  const { contentDetails, snippet, statistics, id } = data;
  // console.log(data);
  const {
    categoryId,
    channelId,
    channelTitle,
    publishedAt,
    thumbnails: {
      high: { url, height, width },
    },
    tags,
    title,
    description,
  } = snippet;
  const { duration } = contentDetails;
  const [profilePicture, setProfilePicture] = useState("");
  const { commentCount, favoriteCount, likeCount, viewCount } = statistics;

  const [showOptionBtn, setShowOptionBtn] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    async function temp() {
      const profilePicture = await PROFILE_PICTURE_FETCHER(channelId);
      setProfilePicture(profilePicture);
    }
    temp();
  }, [title]);
  const sideBarOpen = useSelector((store) => store?.app?.sideBarOpen);
  let widthString = sideBarOpen ? "w-[30%]" : "w-[23%]";
  let heightString = searchFeedVideo ? "h-[25vh]" : "h-[46vh]";

  widthString = searchFeedVideo ? "w-[80%]" : widthString;
  const bottomPosString = sideBarOpen ? "bottom-2" : "bottom-6";
  const navigate = useNavigate();
  return (
    <div
      onMouseOver={() => setShowOptionBtn(true)}
      onMouseOut={() => setShowOptionBtn(false)}
      className={`${widthString} ${heightString}  ${
        searchFeedVideo ? "gap-2" : "gap-0"
      } relative flex ${!searchFeedVideo && "flex-col"} text-white mb-4    `}
    >
      <section
        onClick={() => navigate(`/watch?v=${id}`)}
        className={`relative ${!searchFeedVideo ? "h-[65%]" : "h-[100%]"} ${
          searchFeedVideo ? "w-[50%]" : "w-[100%]"
        }`}
      >
        <img
          src={url}
          alt=""
          className="cursor-pointer 
          h-full w-[100%]  object-cover rounded-xl"
        />
        <small
          className={`bg-black absolute right-2 ${bottomPosString} px-2 py-[2px] rounded-md`}
        >
          {DurationCalculator(duration)}
        </small>
      </section>
      <section
        className={`flex p-2 h-[35%] w-[100%] relative items-start gap-2 ${
          !searchFeedVideo ? "py-4" : "py-0"
        } border-1`}
      >
        {!searchFeedVideo && (
          <span className="flex-shrink-0 flex-grow-0 flex w-[10%] relative h-[40%] ">
            <img
              src={profilePicture}
              className=" h-[90%] rounded-full object-contain"
              alt=""
            />
          </span>
        )}
        <span className={`w-[85%] flex ${searchFeedVideo && "gap-1"} flex-col`}>
          <p
            onClick={() => navigate(`/watch?v=${id}`)}
            className="hover:cursor-pointer text-base line-clamp-2 font-semibold"
          >
            {title}
          </p>
          <p className="text-stone-400 text-sm">{channelTitle}</p>
          <span className="text-stone-400 text-sm flex gap-2">
            <p>{ViewsCounter(viewCount)} views</p>
            <p className="before:content-['•'] before:mr-1">
              {TimeCounter(publishedAt)}
            </p>
          </span>
        </span>
        <span className={`${searchFeedVideo ? "w-[15%]" : ""}`}>
          {!showOptions ? (
            <CiMenuKebab
              onClick={() => setShowOptions(true)}
              style={{ visibility: !showOptionBtn ? "hidden" : "" }}
              size={20}
              className={`hover:bg-stone-800 p-[1px] py-[2px] rounded-full ${
                searchFeedVideo && "mt-1 justify-end"
              } cursor-pointer self-start`}
            />
          ) : (
            <RxCross1
              onClick={() => setShowOptions(false)}
              style={{ visibility: !showOptionBtn ? "hidden" : "" }}
              size={20}
              className={`hover:bg-stone-800 p-[1px] py-[2px] rounded-full ${
                searchFeedVideo && "mt-1 justify-end"
              } cursor-pointer self-start`}
            />
          )}
          <section
            style={{ display: !showOptions ? "none" : "" }}
            className="w-[12vw]
rounded-md absolute right-8 top-4 bg-stone-800 "
          >
            <span className="flex py-[10px]  rounded-md px-2 hover:bg-stone-700 hover:cursor-pointer items-start  gap-2">
              <MdOutlineWatchLater size={18} />
              <p className="m-0">Add to watch later</p>
            </span>
            <span className="flex py-[10px] rounded-md  hover:bg-stone-700 hover:cursor-pointer items-start gap-2 px-2 ">
              <FaShare size={18} />
              <p className="m-0">Share</p>
            </span>
          </section>
        </span>
      </section>
    </div>
  );
};

export default VideoCard;
