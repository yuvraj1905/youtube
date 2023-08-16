import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchQueryAPI, moreVideosFetcherAPI } from "../utils/apiCalls";
import VideoCard from "./VideoCard";
import { LeftSideBar } from "./LeftSideBar";
import { useSelector } from "react-redux";

const ResultsPage = () => {
  const [searchQuery] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const query = searchQuery.get("search_query");
  const sideBarOpen = useSelector((store) => store.app.sideBarOpen);
  const [pages, setPages] = useState(1);
  const [nextPageToken, setNextPageToken] = useState("");

  const getVideos = async () => {
    try {
      const res = await fetchSearchQueryAPI(query);
      console.log(res, "opopop");
      res && setNextPageToken(res[1]);
      res && setVideos([...videos, ...res[0]?.items]);
    } catch (e) {
      console.log(e);
    }
  };
  const moreVideosFetcher = async (token) => {
    try {
      const res = await fetchSearchQueryAPI(query, token);
      res && setNextPageToken(res[1]);
      res && setVideos([...videos, ...res[0]?.items]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(query, "SEARCHQUERY");
    pages === 1 ? getVideos() : moreVideosFetcher(nextPageToken);
  }, [pages, query]);

  // useEffect(() => {
  //   if (videos.length !== 0) {
  //     setPages(1);
  //     //ye work karega ya nhi yaha pe chore the..?? mtlb setpages 1 karna component re-render krega ya nhi, specifically base case me -> jub hum page scroll nhi kiye h (page number change nhi hua h) aur wahi se koi dusra search query ke liye call krte h ...
  //   }
  // }, [searchQuery]);

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
    ? `bg-black box-border w-[92%] py-4 px-8 ml-[8%] min-h-[90vh] relative  `
    : `bg-black box-border w-[85%] py-4 px-8 ml-[15%] min-h-[90vh] relative  `;
  return (
    <div className="w-[100%] box-border flex bg-black relative mt-[8vh]">
      <LeftSideBar />
      {videos?.length > 1 ? (
        <section
          className={`w-[100%] ${classNameString} flex flex-col  gap-2 justify-center items-center overflow-hidden pt-6`}
        >
          {videos?.map((video) => (
            <VideoCard data={video} key={video.id} searchFeedVideo />
          ))}
        </section>
      ) : (
        <div
          className={`w-[100%] ${classNameString} flex flex-col gap-2 justify-between overflow-hidden pt-6`}
        >
          <h1>Unable to fetch the requested query for now !</h1>
          <h3>
            Better try the original Youtube ! , this one's powered by free
            API's, that too with limits
          </h3>
          <p>So , it breaks anytime ! Sorry for the inconvenience</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
