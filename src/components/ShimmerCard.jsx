import React from "react";
import { useSelector } from "react-redux";

const ShimmerCard = ({
  height,
  width,
  data,
  searchFeedVideo,
  likedVideosCard,
  relatedCard,
}) => {
  const sideBarOpen = useSelector((store) => store?.app?.sideBarOpen);

  let widthString = sideBarOpen ? "w-[30%]" : "w-[23%]";
  let heightString = searchFeedVideo ? "h-[25vh]" : "h-[46vh]";
  heightString = relatedCard ? "h-[20vh]" : heightString;

  widthString = searchFeedVideo ? "w-[90%]" : widthString;
  widthString = relatedCard ? "w-full" : widthString;

  return (
    <div
      className={`blinkk  ${widthString} ${heightString}  ${
        searchFeedVideo ? "gap-2" : "gap-0"
      } ${relatedCard && "gap-1"} relative flex ${
        !searchFeedVideo && "flex-col"
      } text-white mb-4 ${relatedCard && "mb-0"} `}
    >
      <section
        className={`rounded-md bg-stone-800 ${
          relatedCard && "flex-shrink-0 flex-grow-0 flex w-[50%]"
        } relative ${!searchFeedVideo ? "h-[65%]" : "h-[100%]"} ${
          searchFeedVideo ? "w-[52%]" : "w-[100%]"
        }`}
      ></section>
      <section
        className={`bg-stone-900  my-2 flex h-[35%] rounded-md px-2 pr-0 w-[100%] relative items-start gap-2 ${
          !searchFeedVideo ? "py-4" : "py-0"
        } border-1  ${
          relatedCard && "flex-shrink-0 flex-grow-0 flex w-[50%]"
        } `}
      >
        {!searchFeedVideo && (
          <span className="flex-shrink-0 flex-grow-0 flex w-[10%] relative h-[45%] bg-stone-800 rounded-full"></span>
        )}
        <span
          className={`w-[90%] bg-stone-800 h-[70%] relative flex ${
            searchFeedVideo && "gap-2"
          } flex-col  ${relatedCard && "mt-2"}`}
        >
          {searchFeedVideo && (
            <span className="text-stone-400 relative text-sm flex gap-2 items-center bg-stone-800"></span>
          )}
          <span className="text-stone-400 bg-stone-800 text-xs flex gap-2"></span>
        </span>
      </section>
    </div>
  );
};

export default ShimmerCard;
