import { useEffect, useState } from "react";
import {
  fetchTagsUrl,
  getAllVideos,
  moreVideosFetcherAPI,
  videoFetchCatBased,
} from "../utils/apiCalls";
import VideoCard from "../components/VideoCard";
import { useSelector } from "react-redux";
import {
  defaultClassNameString,
  dummyArray,
  homeSectionStyle,
  tagsStyle,
} from "../utils/helper";
import ShimmerCard from "../components/ShimmerCard";

export const MainContent = () => {
  const sideBarOpen = useSelector((store) => store.app.sideBarOpen);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);
  const [nextPageToken, setNextPageToken] = useState("");
  const [tagResults, setTagsResults] = useState({ state: false });
  const getVideos = async () => {
    try {
      const res = tagResults.state
        ? await videoFetchCatBased(tagResults.title, tagResults.id)
        : await getAllVideos();
      if (res) {
        setNextPageToken(res?.nextPageToken);
        res && setData([...res?.items]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const moreVideosFetcher = async (token) => {
    const res = tagResults.state
      ? await videoFetchCatBased(tagResults.title, tagResults.id, nextPageToken)
      : await moreVideosFetcherAPI(token);
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
      try {
        const res = await fetch(fetchTagsUrl);
        const data = await res.json();
        if (data) {
          setTags([...data?.items]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    tagsFetcher();
  }, []);

  const classNameString = !sideBarOpen
    ? ` w-[92%] ml-[8%] `
    : ` w-[85%] ml-[15%] `;

  const tagFilterHandler = async (id, title) => {
    const res = await videoFetchCatBased(title, id);
    if (res?.items?.length > 0) {
      setData([]);
      setTimeout(() => {
        setNextPageToken(res?.nextPageToken);
        setData([...res?.items]);
        setTagsResults({
          state: true,
          title,
          id,
        });
      }, 500);
    }
  };

  const allClickHandler = async () => {
    const res = await getAllVideos();
    if (res) {
      setNextPageToken(res?.nextPageToken);
      setData([...res?.items]);
      setTagsResults({
        state: false,
      });
    }
  };

  return (
    <>
      {data?.length < 1 || tags?.length < 1 ? (
        <div className={`${classNameString} ${defaultClassNameString} `}>
          <section className={homeSectionStyle}>
            {dummyArray.map((item, index) => (
              <ShimmerCard key={index} />
            ))}
          </section>
        </div>
      ) : (
        <div
          className={`${classNameString} ${defaultClassNameString} flex flex-col`}
        >
          {tags?.length > 1 && (
            <section className="w-[100%] flex gap-3 whitespace-nowrap overflow-x-scroll relative scrollBarHr pb-2">
              <small onClick={allClickHandler} className={tagsStyle}>
                All
              </small>

              {tags?.map(({ id, snippet: { title } }) => (
                <small
                  key={id}
                  onClick={() => tagFilterHandler(id, title)}
                  className={tagsStyle}
                >
                  {title}
                </small>
              ))}
            </section>
          )}
          <section className={homeSectionStyle}>
            {data?.map((video) => (
              <VideoCard data={video} key={video.id} />
            ))}
          </section>
        </div>
      )}
    </>
  );
};
