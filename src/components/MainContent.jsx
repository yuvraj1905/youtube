import { useEffect, useState } from "react";
import { API_CALL_URL } from "../utils/apiCalls";
import VideoCard from "./VideoCard";

export const MainContent = () => {
  const [data, setData] = useState([]);
  const getVideos = async () => {
    try {
      const res = await fetch(API_CALL_URL);
      const api_data = await res.json();

      setData([...api_data.items]);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);
  return (
    <>
      {data?.length < 1 ? (
        "SHIMMEER"
      ) : (
        <div className="bg-black box-border w-[85%] p-4 ml-[15%] relative flex flex-wrap gap-2 justify-between overflow-hidden ">
          {data?.map((video) => (
            <VideoCard data={video} key={video.id} />
          ))}
        </div>
      )}
    </>
  );
};
