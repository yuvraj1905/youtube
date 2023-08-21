import React from "react";
import { useSelector } from "react-redux";

const Error = () => {
  const sideBarOpen = useSelector((store) => store.app.sideBarOpen);
  const classNameString = !sideBarOpen
    ? `bg-black box-border w-[92%] py-4 px-8 ml-[8%] min-h-[90vh] relative  `
    : `bg-black box-border w-[85%] py-4 px-8 ml-[15%] min-h-[90vh] relative  `;
  return (
    <div
      className={`w-[100%] ${classNameString} flex flex-col gap-2 justify-between overflow-hidden pt-6`}
    >
      <h1>Unable to fetch the request for now !</h1>
      <h3>
        Better try the original Youtube ! , this one's powered by free API's,
        that too with limits
      </h3>
      <p>So , it breaks anytime ! Sorry for the inconvenience</p>
    </div>
  );
};

export default Error;
