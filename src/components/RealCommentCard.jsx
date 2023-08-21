import React from "react";
import { TimeCounter } from "../utils/CalculatorFunctions";

const RealCommentCard = ({ data }) => {
  const { authorDisplayName, authorProfileImageUrl, textDisplay, publishedAt } =
    data;
  return (
    <div className="flex text-white w-full  h-[8vh] mb-4 gap-4 items-start">
      <img
        src={authorProfileImageUrl}
        alt=""
        className="w-[4%] h-[65%] rounded-full mt-1"
      />
      <section className="flex flex-col ">
        <span className="flex gap-4 items-center ">
          <p className="text-white font-semibold">{authorDisplayName}</p>
          <small className="text-stone-300">{TimeCounter(publishedAt)}</small>
        </span>
        <p className="line-clamp-1">{textDisplay}</p>
      </section>
    </div>
  );
};

export default RealCommentCard;
