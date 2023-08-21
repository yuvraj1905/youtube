import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoCard from "../components/VideoCard";
import { useSearchParams } from "react-router-dom";
import { fetch_channel } from "../utils/apiCalls";
import { LeftSideBar } from "../components/LeftSideBar";
import Error from "../components/Error";
import { formatSubscriberCount } from "../utils/CalculatorFunctions";
import { defaultClassNameString } from "../utils/helper";

export const Profile = () => {
  const [channel] = useSearchParams();
  const [channelId, setChannelId] = useState(channel.get("cId"));
  const sideBarOpen = useSelector((store) => store.app.sideBarOpen);
  const [profileDetails, setProfileDetails] = useState({});
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [nextPageToken, setNextPageToken] = useState("");
  const getVideos = async (channel_id = channelId) => {
    try {
      const res = await fetch_channel(channel_id);
      res &&
        setProfileDetails({
          ...res?.[0]?.items?.[0]?.snippet,
          ...res?.[0]?.items?.[0]?.statistics,
        });
      res && setNextPageToken(res?.[2]);
      res && setData([...res?.[1]?.items]);
    } catch (e) {
      console.log(e);
    }
  };

  const moreVideosFetcher = async (token) => {
    const res = await fetch_channel(channelId, token);
    res && setNextPageToken(res?.[1]);
    res && setData([...data, ...res?.[0]?.items]);
  };
  useEffect(() => {
    pages > 1 && moreVideosFetcher(nextPageToken);
  }, [pages]);

  useEffect(() => {
    setChannelId(channel.get("cId"));
    setPages(1);
    getVideos(channel.get("cId"));
  }, [channel]);

  useEffect(() => {
    const listenerFunction = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      )
        setPages((pages) => pages + 1);
    };
    window.addEventListener("scroll", listenerFunction);
    return () => {
      window.removeEventListener("scroll", listenerFunction);
    };
  }, []);

  const classNameString = !sideBarOpen
    ? ` w-[92%] ml-[8%] `
    : ` w-[85%] ml-[15%] `;
  return (
    <div className="w-[100%] box-border flex bg-black relative mt-[8vh]">
      <LeftSideBar />
      {data?.length > 1 ? (
        <section
          className={`w-[100%] ${classNameString} ${defaultClassNameString} flex flex-col gap-2 justify-center items-center overflow-hidden pt-6`}
        >
          <span
            className={`flex w-[82%]  ml-[5%] self-start items-center gap-8 border-b pb-4 border-stone-500 mb-4 `}
          >
            <img
              src={profileDetails?.thumbnails?.high?.url}
              className="w-[12%] rounded-full object-cover "
              alt=""
            />
            <div className="text-white flex flex-col gap-1">
              <h2 className="font-bold text-2xl">{profileDetails?.title}</h2>
              <h2 className="text-stone-300 text-md font-semibold ">
                {profileDetails?.customUrl}
              </h2>
              <span className="flex gap-4 font-semibold text-stone-300">
                <p className="text-sm">
                  {formatSubscriberCount(profileDetails?.subscriberCount)}
                  Subscribers
                </p>
                <p className="text-sm">{profileDetails?.videoCount} Videos</p>
              </span>
              <p className="text-stone-400 w-full line-clamp-1">
                {profileDetails?.description} Videos
              </p>
            </div>
          </span>
          {data?.map((video) => (
            <VideoCard data={video} key={video.id} searchFeedVideo />
          ))}
        </section>
      ) : (
        <Error />
      )}
    </div>
  );
};
