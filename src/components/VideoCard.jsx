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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToHistory,
  addToWatchLaterVideos,
  removeFromLikedVideos,
  removeFromWatchLaterVideos,
} from "../utils/librarySlice";
import { AiOutlineDislike } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

const VideoCard = ({ data, searchFeedVideo, likedVideosCard, relatedCard }) => {
  const { contentDetails, snippet, statistics, id } = data;
  // console.log(data);
  const watchLater = useSelector((store) => store.library.watchLater);
  const isVideoSetToWatchLater = watchLater?.find((vid) => vid.id === id);
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
  heightString = relatedCard ? "h-[20vh]" : heightString;

  widthString = searchFeedVideo ? "w-[90%]" : widthString;
  widthString = relatedCard ? "w-full" : widthString;

  let bottomPosString = sideBarOpen ? "bottom-2" : "bottom-6";
  bottomPosString = relatedCard ? "bottom-4" : bottomPosString;
  const navigate = useNavigate();

  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();

  return (
    <div
      onMouseOver={() => setShowOptionBtn(true)}
      onMouseOut={() => setShowOptionBtn(false)}
      className={`  ${widthString} ${heightString}  ${
        searchFeedVideo ? "gap-2" : "gap-0"
      } ${relatedCard && "gap-1"} relative flex ${
        !searchFeedVideo && "flex-col"
      } text-white mb-4 ${relatedCard && "mb-0"} `}
    >
      <section
        onMouseOver={() => {
          setTimer(
            setTimeout(() => {
              setIsPlayingVideo(true);
            }, 1000)
          );
        }}
        onMouseOut={() => {
          clearTimeout(timer);
          setIsPlayingVideo(false);
        }}
        onClick={() => {
          dispatch(addToHistory(data));
          navigate(`/watch?v=${id}`);
        }}
        className={` ${
          relatedCard && "flex-shrink-0 flex-grow-0 flex w-[50%]"
        } relative ${!searchFeedVideo ? "h-[65%]" : "h-[100%]"} ${
          searchFeedVideo ? "w-[52%]" : "w-[100%]"
        }`}
      >
        {!isPlayingVideo ? (
          <>
            <img
              src={url}
              alt=""
              className="cursor-pointer h-full w-[100%]  object-cover rounded-xl"
            />
            <small
              className={`bg-black absolute right-2 ${bottomPosString} px-2 py-[2px] rounded-md`}
            >
              {DurationCalculator(duration)}
            </small>
          </>
        ) : (
          <iframe
            width="100%"
            height="100%"
            title={title}
            allowFullScreen
            className="rounded-xl"
            src={"https://www.youtube.com/embed/" + id + "?autoplay=1&mute=1"}
          ></iframe>
        )}
      </section>
      <section
        className={`flex p-2 h-[35%] w-[100%] relative items-start gap-2 ${
          !searchFeedVideo ? "py-4" : "py-0"
        } border-1  ${relatedCard && "flex-shrink-0 flex-grow-0 flex w-[50%]"}`}
      >
        {!searchFeedVideo && (
          <span className="flex-shrink-0 flex-grow-0 flex w-[10%] relative h-[40%] ">
            {
              <img
                onClick={() => navigate(`/profile?cId=${channelId}`)}
                src={profilePicture}
                className=" h-[90%] cursor-pointer rounded-full object-contain"
                alt=""
              />
            }
          </span>
        )}
        <span
          className={`w-[90%] relative flex ${
            searchFeedVideo && "gap-2"
          } flex-col  ${relatedCard && "mt-2"}`}
        >
          <p
            onClick={() => navigate(`/watch?v=${id}`)}
            className={`hover:cursor-pointer text-base line-clamp-2 font-semibold  ${
              relatedCard && "text-[0.8rem] "
            }`}
          >
            {title}
          </p>
          {!searchFeedVideo && (
            <p
              onClick={() => navigate(`/profile?cId=${channelId}`)}
              className="text-stone-300 my-1 text-sm cursor-pointer"
            >
              {channelTitle}
            </p>
          )}
          {searchFeedVideo && (
            <span className="text-stone-400 relative text-sm flex gap-2 items-center">
              <img
                onClick={() => {
                  navigate(`/profile?cId=${channelId}`);
                }}
                src={profilePicture}
                className={`w-[4%] cursor-pointer rounded-full object-contain ${
                  relatedCard && "w-5"
                }`}
                alt=""
              />
              <p
                className={`${
                  relatedCard && "text-sm"
                } cursor-pointer text-stone-300`}
                onClick={() => navigate(`/profile?cId=${channelId}`)}
              >
                {channelTitle}
              </p>
            </span>
          )}
          <span className="text-stone-400 text-xs flex gap-2">
            <p>{ViewsCounter(viewCount)} views</p>
            <p className="before:content-['•'] before:mr-1">
              {TimeCounter(publishedAt)}
            </p>
          </span>
          {!relatedCard && searchFeedVideo && (
            <small className="line-clamp-1 text-stone-400">{description}</small>
          )}
        </span>
        <span
          className={`${searchFeedVideo ? "w-[15%]" : ""}  ${
            relatedCard && "mt-2 w-[5%]"
          }`}
        >
          {!showOptions ? (
            <CiMenuKebab
              onClick={() => setShowOptions(true)}
              style={{ visibility: !showOptionBtn ? "hidden" : "" }}
              size={relatedCard ? 16 : 20}
              className={`hover:bg-stone-800 p-[1px] py-[2px] rounded-full ${
                searchFeedVideo && "mt-1 justify-end"
              } cursor-pointer self-start`}
            />
          ) : (
            <RxCross1
              onClick={() => setShowOptions(false)}
              style={{ visibility: !showOptionBtn ? "hidden" : "" }}
              size={relatedCard ? 16 : 20}
              className={`hover:bg-stone-800 p-[1px] py-[2px] rounded-full ${
                searchFeedVideo && "mt-1 justify-end"
              } cursor-pointer self-start`}
            />
          )}
          <section
            style={{ display: !showOptions ? "none" : "" }}
            className={`w-[15vw]
rounded-md absolute right-8 top-5 bg-stone-800 ${
              searchFeedVideo && !relatedCard && "top-1 right-28"
            } ${searchFeedVideo && sideBarOpen && "top-1 right-32"} `}
          >
            {likedVideosCard && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeFromLikedVideos(id));
                }}
                className="flex py-[10px]  rounded-md px-2 hover:bg-stone-700 hover:cursor-pointer items-center  gap-2 z-10"
              >
                <AiOutlineDislike size={18} />
                <p className="m-0">Dislike Video</p>
              </span>
            )}
            <span
              onClick={(e) => {
                e.stopPropagation();
                !isVideoSetToWatchLater
                  ? dispatch(addToWatchLaterVideos(data))
                  : dispatch(removeFromWatchLaterVideos(id));
                setShowOptions(false);
              }}
              className="flex py-[10px]  rounded-md px-2 hover:bg-stone-700 hover:cursor-pointer items-center  gap-2 z-10"
            >
              <MdOutlineWatchLater size={18} />
              <p className="m-0">
                {isVideoSetToWatchLater ? "Remove from" : "Add to"} watch later
              </p>
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `https://www.youtube.com/watch?v=${id}`
                );
                setShowOptions(false);
                toast.success("Link copied to clipboard!");
              }}
              className="flex py-[10px] rounded-md  hover:bg-stone-700 hover:cursor-pointer items-center gap-2 px-2 "
            >
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
