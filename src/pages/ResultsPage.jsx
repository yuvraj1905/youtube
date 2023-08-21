import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSearchQueryAPI } from "../utils/apiCalls";
import VideoCard from "../components/VideoCard";
import { LeftSideBar } from "../components/LeftSideBar";
import { useSelector } from "react-redux";
import { defaultClassNameString } from "../utils/helper";
import Error from "../components/Error";

const ResultsPage = () => {
  const [searchQuery] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState(searchQuery.get("search_query"));
  const sideBarOpen = useSelector((store) => store.app.sideBarOpen);
  const [pages, setPages] = useState(1);
  const [nextPageToken, setNextPageToken] = useState("");

  const getVideos = async (queryy = query) => {
    try {
      const res = await fetchSearchQueryAPI(queryy);
      res && setNextPageToken(res?.nextPageToken);
      res && setVideos([...res?.items]);
    } catch (e) {
      console.log(e);
    }
  };
  const moreVideosFetcher = async (token) => {
    try {
      const res = await fetchSearchQueryAPI(query, token);
      res && setNextPageToken(res.nextPageToken);
      res && setVideos([...videos, ...res?.items]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    pages > 1 && moreVideosFetcher(nextPageToken);
  }, [pages]);

  useEffect(() => {
    setQuery(searchQuery.get("search_query"));
    setPages(1);
    getVideos(searchQuery.get("search_query"));
  }, [searchQuery]);

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
      {videos?.length > 1 ? (
        <section
          className={`w-[100%] ${classNameString} ${defaultClassNameString} flex flex-col  gap-2 justify-center items-center overflow-hidden pt-6`}
        >
          {videos?.map((video) => (
            <VideoCard data={video} key={video.id} searchFeedVideo />
          ))}
        </section>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default ResultsPage;
