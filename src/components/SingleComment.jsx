import React from "react";

const SingleComment = ({ comment }) => {
  return (
    <div className="flex justify-between items-center min-h-[6vh]  text-white px-2 pr-4 py-1 w-full hover:bg-stone-800">
      <span className="flex gap-2 items-center text-stone-300 w-full px-2 py-1 ">
        <img src={comment.imgUrl} className="rounded-full h-[4vh]" alt="" />
        <p className="text-stone-400 text-sm font-semibold">
          {comment.username}
        </p>
      </span>
      <small className="self-center line-clamp-2 flex-grow-0 flex-shrink-0 flex w-[70%] min-h-full items-center ">
        {comment.text}
      </small>
    </div>
  );
};

export default SingleComment;
