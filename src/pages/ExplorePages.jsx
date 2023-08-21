import { useEffect, useState } from "react";
import {
  fetchSearchQueryAPI,
  getAllVideos,
  moreVideosFetcherAPI,
} from "../utils/apiCalls";
import VideoCard from "../components/VideoCard";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { LeftSideBar } from "../components/LeftSideBar";
import Error from "../components/Error";

export const Explore = () => {
  const sideBarOpen = useSelector((store) => store.app.sideBarOpen);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("sq"));
  console.log(query);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [nextPageToken, setNextPageToken] = useState("");
  const getVideos = async (queryy = query) => {
    try {
      const res =
        queryy === "Trending"
          ? await getAllVideos()
          : await fetchSearchQueryAPI(queryy);
      res && setNextPageToken(res?.nextPageToken);
      res && setData([...res?.items]);
    } catch (e) {
      console.log(e);
    }
  };
  const moreVideosFetcher = async (token) => {
    const res =
      query == "Trending"
        ? await moreVideosFetcherAPI(token)
        : await fetchSearchQueryAPI(query, token);
    setNextPageToken(res?.nextPageToken);
    setData([...data, ...res?.items]);
  };
  useEffect(() => {
    pages > 1 && moreVideosFetcher(nextPageToken);
  }, [pages]);

  useEffect(() => {
    setQuery(searchParams.get("sq"));
    setPages(1);
    getVideos(searchParams.get("sq"));
  }, [searchParams]);

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
      {data?.length > 1 ? (
        <section
          className={` ${classNameString} flex flex-col  gap-2 justify-center items-center overflow-hidden pt-6 relative`}
        >
          <h1 className="text-white self-start ml-16 font-bold text-3xl mb-6 pb-2 border-b-2 w-[30%] border-stone-400  ">
            {query}{" "}
            <small className="text-sm italic text-stone-300">in videos</small>
          </h1>
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
