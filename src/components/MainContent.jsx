import { useEffect, useState } from "react";
import {
  API_CALL_URL,
  fetchTagsUrl,
  moreVideosFetcherAPI,
  videoFetchCatBased,
} from "../utils/apiCalls";
import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";

export const MainContent = () => {
  const sideBarOpen = useSelector((store) => store.app.sideBarOpen);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [nextPageToken, setNextPageToken] = useState("");
  const getVideos = async () => {
    try {
      const res = await fetch(API_CALL_URL);
      const api_data = await res.json();
      setNextPageToken(api_data?.nextPageToken);
      setData([...api_data?.items]);
    } catch (e) {
      console.log(e);
    }
  };
  const moreVideosFetcher = async (token) => {
    const res = await moreVideosFetcherAPI(token);
    setNextPageToken(res?.nextPageToken);
    setData([...data, ...res?.items]);
  };
  useEffect(() => {
    pages === 1 ? getVideos() : moreVideosFetcher(nextPageToken);
  }, [pages]);

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

  const [tags, setTags] = useState([]);
  useEffect(() => {
    async function tagsFetcher() {
      const res = await fetch(fetchTagsUrl);
      const data = await res.json();
      setTags([...tags, ...data?.items]);
    }
    tagsFetcher();
  }, []);

  const classNameString = !sideBarOpen
    ? `bg-black box-border w-[92%] py-4 px-8 ml-[8%] min-h-[90vh] relative  `
    : `bg-black box-border w-[85%] py-4 px-8 ml-[15%] min-h-[90vh] relative  `;

  const tagFilterHandler = async (id, title) => {
    if (title === "All") {
    } else {
      const res = await videoFetchCatBased(title, id);
      // console.log(res);
      if (res.length > 0) setData([...res]);
    }
  };

  return (
    <>
      {data?.length < 1 ? (
        "SHIMMEER"
      ) : (
        <div className={`${classNameString} flex flex-col`}>
          {tags?.length > 1 && (
            <section className="w-[100%] flex gap-3 whitespace-nowrap overflow-x-scroll relative scrollBarHr pb-2">
              <small
                onClick={() => getVideos()}
                className="text-white font-semibold rounded-lg bg-stone-800 p-2 px-3 cursor-pointer hover:bg-stone-700 whitespace-nowrap "
              >
                All
              </small>
              {tags?.map(({ id, snippet: { title } }) => (
                <small
                  key={id}
                  onClick={() => tagFilterHandler(id, title)}
                  className="text-white font-semibold rounded-lg bg-stone-800 p-2 px-3 cursor-pointer hover:bg-stone-700 whitespace-nowrap "
                >
                  {title}
                </small>
              ))}
            </section>
          )}
          <section className="w-[100%] flex flex-wrap gap-2 justify-between overflow-hidden pt-6">
            {data?.map((video) => (
              <VideoCard data={video} key={video.id} />
            ))}
          </section>
        </div>
      )}
    </>
  );
};
