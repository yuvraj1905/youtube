import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import {
  addToLikedVideos,
  addToWatchLaterVideos,
  removeFromLikedVideos,
  removeFromWatchLaterVideos,
} from "../utils/librarySlice";
import {
  PROFILE_PICTURE_FETCHER,
  commentsFetcher,
  fetch_channel,
  getAllVideos,
  videoFetcherFromVideoId,
} from "../utils/apiCalls";
import {
  handleSearchInput,
  toggle,
  toggleForWatchPage,
} from "../utils/appSlice";
import { LeftSideBar } from "../components/LeftSideBar";
import { AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import {
  DurationCalculator,
  TimeCounter,
  ViewsCounter,
  formatSubscriberCount,
} from "../utils/CalculatorFunctions";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { addComment } from "../utils/commentSlice";
import { randomCommentGenrrator, randomNameGenerate } from "../utils/helper";
import SingleComment from "../components/SingleComment";
import VideoCard from "../components/VideoCard";
import RealCommentCard from "../components/RealCommentCard";
import toast, { Toaster } from "react-hot-toast";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const vidId = searchParams.get("v");
  const sideBarOpen = useSelector((store) => store.app.sideBarOpen);
  const comments = useSelector((store) => store?.commentsList?.comments);

  const likedVideos = useSelector((store) => store.library.likedVideos);
  const watchLater = useSelector((store) => store.library.watchLater);
  const isVideoLiked = likedVideos?.find((vid) => vid.id === vidId);
  const isVideoSetToWatchLater = watchLater?.find((vid) => vid.id === vidId);
  const dispatch = useDispatch();
  const [videoDetails, setVideoDetails] = useState({});
  const [profileDetails, setProfileDetails] = useState({});

  const [realComments, setRealComments] = useState();
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const relatedVideosSetter = async () => {
      try {
        const res = await getAllVideos();
        if (res?.items?.length > 0) {
          const filteredData = res.items.filter(({ id }) => id != vidId);
          setRelatedVideos([...filteredData]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    relatedVideosSetter();
  }, [searchParams]);

  useEffect(() => {
    dispatch(toggleForWatchPage(false));
    dispatch(handleSearchInput(""));
    const videoDetailsGetter = async () => {
      const res = await videoFetcherFromVideoId(vidId);
      const res2 = await fetch_channel(res?.items?.[0]?.snippet?.channelId);
      res2 &&
        setProfileDetails({
          ...res2?.[0]?.items?.[0]?.snippet,
          ...res2?.[0]?.items?.[0]?.statistics,
        });
      res?.items?.length > 0 && setVideoDetails({ ...res.items[0] });
      setLoading(false);
      if (res?.items?.length > 0) {
        const comments = await commentsFetcher(res?.items[0]?.id);
        comments?.length > 0 && setRealComments([...comments]);
      }
    };
    videoDetailsGetter();
    return () => {
      dispatch(toggleForWatchPage(true));
    };
  }, [searchParams]);
  const videoPlayback = useRef(null);

  // console.log(videoDetails);
  // const { title } = videoDetails?.snippet;
  // const { commentCount, likeCount, viewCount } = videoDetails?.statistics;

  let count = 0;
  const randomNumberOfStrings = [5, 10, 15, 20, 30, 25, 35];

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(
        addComment({
          imgUrl: `https://source.unsplash.com/random/200x200?sig=${count}`,
          text: randomCommentGenrrator(
            randomNumberOfStrings[Math.trunc(Math.random() * 7)]
          ),
          username: randomNameGenerate(),
        })
      );
      count++;
    }, 1500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const [commentInput, setCommentInput] = useState("");
  const navigate = useNavigate();
  // console.log(videoDetails, "pp");

  return (
    <>
      {sideBarOpen && (
        <section className="absolute left-0">
          <LeftSideBar />
        </section>
      )}
      <div className="w-[100%] min-h-screen box-border flex bg-black relative justify-between mt-[8vh] px-[6.25rem] text-white py-6">
        <section className="w-[66%] min-h-screen flex flex-col gap-2 relative">
          <iframe
            className="shadoww h-[70vh]"
            width="100%"
            ref={videoPlayback}
            src={
              "https://www.youtube.com/embed/" +
              vidId +
              "?autoplay=1&showinfo=0&rel=0"
            }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>

          <div
            style={{ display: !loading ? "none" : "" }}
            className="blinkk w-full h-[16vh] rounded-md bg-stone-800 "
          ></div>

          <h1 className="font-semibold line-clamp-2  text-xl">
            {videoDetails?.snippet?.title}
          </h1>
          <div className="flex w-full justify-between  items-center">
            <section className="w-[40%] relative flex gap-4">
              <img
                onClick={() =>
                  navigate(`/profile?cId=${videoDetails?.snippet?.channelId}`)
                }
                src={profileDetails?.thumbnails?.high?.url}
                className="cursor-pointer w-[12%] h-11 rounded-full "
                alt=""
              />
              <span>
                <p
                  onClick={() =>
                    navigate(`/profile?cId=${videoDetails?.snippet?.channelId}`)
                  }
                  className="font-bold cursor-pointer"
                >
                  {videoDetails?.snippet?.channelTitle}
                </p>
                <small className="text-stone-300">
                  {formatSubscriberCount(profileDetails?.subscriberCount)}
                  Subscribers
                </small>
              </span>
              <span className="bg-stone-100 flex  rounded-full min-w-20 text-black self-center px-3 py-2 font-semibold cursor-pointer hover:bg-stone-200">
                <p className="text-sm">Subscribed</p>
              </span>
            </section>
            <section className="flex gap-2">
              <span
                className="bg-stone-800 flex p-2 rounded-full w-20 items-center justify-evenly font-semibold cursor-pointer hover:bg-stone-700"
                onClick={() => {
                  !isVideoLiked
                    ? dispatch(addToLikedVideos(videoDetails))
                    : dispatch(removeFromLikedVideos(vidId));
                }}
              >
                {isVideoLiked ? (
                  <AiFillLike size={18} />
                ) : (
                  <AiOutlineLike size={18} />
                )}
                <small>
                  {videoDetails?.statistics?.likeCount &&
                    ViewsCounter(videoDetails?.statistics?.likeCount)}
                </small>
              </span>
              <span
                className="bg-stone-800 flex p-2 rounded-full w-48 items-center justify-evenly font-semibold cursor-pointer hover:bg-stone-700"
                onClick={() => {
                  !isVideoSetToWatchLater
                    ? dispatch(addToWatchLaterVideos(videoDetails))
                    : dispatch(removeFromWatchLaterVideos(vidId));
                }}
              >
                {isVideoSetToWatchLater ? (
                  <MdWatchLater size={18} />
                ) : (
                  <MdOutlineWatchLater size={18} />
                )}
                <small>
                  {isVideoSetToWatchLater ? "Remove from" : "Add to"} watch
                  later
                </small>
              </span>
              <span
                onClick={() => {
                  toast.success("Link copied to clipboard!");
                }}
                className="bg-stone-800 flex p-2 rounded-full w-24 items-center justify-evenly font-semibold cursor-pointer hover:bg-stone-700 border-none outline-none"
              >
                <FaShare size={18} />
                <p>share</p>
              </span>
            </section>
          </div>
          <section className="flex flex-col hover:bg-stone-700 bg-stone-800 rounded-xl  p-2 px-4 w-[100%]">
            <span className="flex gap-3 w-full font-semibold items-center">
              <p className="text-md">
                {formatSubscriberCount(videoDetails?.statistics?.viewCount)}{" "}
                views
              </p>
              <p className="text-md">
                {TimeCounter(videoDetails?.snippet?.publishedAt)}
              </p>
              <span className="flex gap-2 text-stone-300 line-clamp-1 items-center ">
                {videoDetails?.snippet?.tags?.slice(0, 2)?.map((tag) => (
                  <small>#{tag}</small>
                ))}
              </span>
            </span>
            <p className="line-clamp-3 text-sm text-stone-300">
              {videoDetails?.snippet?.description}
            </p>
          </section>

          <h3 className="text-md font-semibold mt-4">
            {formatSubscriberCount(videoDetails?.statistics?.commentCount)}
            {"  "}
            Comments
          </h3>
          <section className="mt-3">
            {realComments?.map((comment) => (
              <RealCommentCard
                data={comment?.snippet?.topLevelComment?.snippet}
              />
            ))}
          </section>
        </section>
        <section className="w-[30.5%] min-h-screen flex flex-col gap-3 relative items-start">
          <button
            className="w-full bg-stone-800 hover:bg-stone-700 p-[6px] rounded-full border-none outline-none font-semibold text-sm"
            onClick={() => setShowLiveChat(!showLiveChat)}
          >
            {showLiveChat ? "Hide" : "Show"} live Chat
          </button>
          <div
            className="w-full bg-stone-900 h-[64vh] scrollBar rounded-lg  text-white flex overflow-y-scroll flex-col-reverse relative"
            style={{ display: !showLiveChat ? "none" : "" }}
          >
            <span className=" overflow-hidden w-full px-2 py-1 bg-stone-700 absolute flex bottom-0">
              <span className="flex gap-[6px] px-1 items-center text-stone-300   ">
                <RxAvatar size={34} />
                <p className="text-stone-400 text-sm font-semibold">Yuvraj</p>
              </span>
              <input
                type="text"
                value={commentInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    dispatch(
                      addComment({
                        username: "Yuvraj",
                        imgUrl:
                          "https://res.cloudinary.com/yuvraj1905/image/upload/v1692423169/def_kjliyl.png",
                        text: commentInput,
                      })
                    );
                    setCommentInput("");
                  }
                }}
                onChange={(e) => setCommentInput(e.target.value)}
                className="border-none outline-none ml-6 bg-stone-700 text-white flex-shrink-0 flex-grow-0 flex w-[55%]"
                placeholder="say something.. "
              />
              <button
                onClick={() => {
                  dispatch(
                    addComment({
                      username: "Yuvraj",
                      imgUrl:
                        "https://res.cloudinary.com/yuvraj1905/image/upload/v1692423169/def_kjliyl.png",
                      text: commentInput,
                    })
                  );
                  setCommentInput("");
                }}
                className="border hover:bg-stone-600 border-stone-600 px-2 rounded-md ml-1"
              >
                Send
              </button>
            </span>
            {comments?.length > 0 &&
              comments?.map((comment, i) => (
                <SingleComment key={i} comment={comment} />
              ))}
          </div>
          <section className="w-full mt-4  min-h-[64vh] scrollBar rounded-lg  text-white flex flex-col  relative">
            {relatedVideos?.map((vid) => (
              <VideoCard data={vid} key={vid.id} searchFeedVideo relatedCard />
            ))}
          </section>
        </section>
      </div>
    </>
  );
};

export default WatchPage;
