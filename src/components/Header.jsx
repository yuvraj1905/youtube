import React, { useState } from "react";
import { RxAvatar, RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { BsFillMicFill, BsSearch } from "react-icons/bs";
const Header = () => {
  const [inputSearch, setInputSearch] = useState("");
  return (
    <div className="flex w-screen bg-black text-white items-center justify-between px-6 py-2 fixed top-0 right-0 left-0 z-50 h-[8vh] pl-4 box-border">
      <section className="relative items-center flex w-[20%] justify-start flex-shrink-0 gap-4 flex-grow-0 h-[100%]">
        <span className="hover:bg-stone-800 rounded-full p-2">
          <RxHamburgerMenu size={21} className="cursor-pointer" />
        </span>
        <img
          className="h-[55%] cursor-pointer"
          src="https://res.cloudinary.com/yuvraj1905/image/upload/v1691386667/youtube_w8u3uq.jpg"
          alt=""
        />
      </section>
      <section className="flex-shrink-0 flex-wrap-0 flex w-[40%] h-[95%] relative items-center justify-between">
        <section className="flex-shrink-0 flex-wrap-0 flex w-[90%] relative border-[1.5px] border-stone-700  h-[100%] px-4 rounded-full pr-0">
          <span className="flex-shrink-0 flex-wrap-0 flex w-[90%] h-[100%] relative justify-between items-center">
            <input
              type="text"
              placeholder="Search"
              value={inputSearch}
              className="text-white w-[90%] bg-black  border-none outline-none h-[100%] "
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <RxCross1 className="mr-3 cursor-pointer " />
          </span>
          <span
            className=" flex-1 flex items-center bg-stone-900 rounded-r-full justify-center cursor-pointer "
            title="Search"
          >
            <BsSearch color="white" />
          </span>
        </section>
        <span
          className="flex-shrink-0 flex-wrap-0 flex w-[7%] bg-stone-800 items-center justify-center rounded-[50%] py-[0.7rem] cursor-pointer hover:bg-stone-700"
          title="Search with your voice"
        >
          <BsFillMicFill size={18} />
        </span>
      </section>
      <section className="flex-shrink-0 flex-wrap-0 flex w-[20%] h-[80%] relative justify-end">
        <RxAvatar size={30} />
      </section>
    </div>
  );
};

export default Header;
