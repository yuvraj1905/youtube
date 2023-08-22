import React, { useEffect, useRef, useState } from "react";
import { RxAvatar, RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { BsFillMicFill, BsSearch } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../utils/appSlice";
import { searchSuggestionsAPI } from "../utils/apiCalls";
import { useNavigate } from "react-router-dom";
import { handleInputChange } from "../utils/searchSlice";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Header = () => {
  const searchQueries = useSelector((store) => store.search.searchQueries);
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [suggestionsHidden, setSuggestionsHidden] = useState(true);
  const searchSuggestionsAPICallHandler = async (query) => {
    try {
      const res = await fetch(searchSuggestionsAPI + query);
      const data = await res.json();
      setSearchSuggestions([...data[1]]);
      dispatch(handleInputChange({ [inputSearch]: [...data[1]] }));
    } catch (err) {
      console.log(err);
    }
  };

  const search = useRef(null);
  useEffect(() => {
    let timer;
    if (inputSearch.length === 0) {
      setSearchSuggestions([]);
    }
    if (inputSearch.length > 0) {
      if (inputSearch in searchQueries) {
        setSearchSuggestions(searchQueries[inputSearch]);
      } else {
        timer = setTimeout(() => {
          searchSuggestionsAPICallHandler(inputSearch);
        }, 300);
      }
    }
    return () => {
      clearTimeout(timer);
    };
  }, [inputSearch]);

  const navigate = useNavigate();
  const [speaking, setSpeaking] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const [showVoiceSearchPanel, setshowVoiceSearchPanel] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const startListeningHandler = () => {
    setshowVoiceSearchPanel(true);
    setSpeaking(true);
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
  };

  const cancelVoiceSearchHandler = () => {
    SpeechRecognition.stopListening();
    setshowVoiceSearchPanel(false);
    setSpeaking(false);
    resetTranscript();
  };
  const stopSpeakingHandler = () => {
    if (transcript?.length > 0) {
      navigate(`/results?search_query=${transcript.replaceAll(" ", "+")}`);
      resetTranscript();
    }
    cancelVoiceSearchHandler();
  };

  const searchHandler = () => {
    navigate(`/results?search_query=${inputSearch.replaceAll(" ", "+")}`);
    setInputSearch("");
    setSuggestionsHidden(true);
  };

  return (
    <>
      <section
        style={{ display: !showVoiceSearchPanel ? "none" : "" }}
        className="h-[50vh] bg-stone-800 text-white w-[40vw] flex flex-col justify-between fixed left-[30%] top-2 z-[200] p-8"
      >
        <span className="flex justify-between ">
          <p className="font-bold text-xl">Tap on the mic to stop speaking..</p>
          <RxCross1
            onClick={cancelVoiceSearchHandler}
            className="hover:bg-stone-700 hover:rounded-full cursor-pointer p-1"
            size={32}
          />
        </span>
        <div>{transcript}</div>

        <BsFillMicFill
          size={40}
          onClick={stopSpeakingHandler}
          color="red"
          className="self-center p-2 cursor-pointer hover:bg-stone-700 rounded-full"
        />
      </section>
      <div className="flex w-screen bg-black text-white items-center justify-between px-6 py-2 fixed top-0 right-0 left-0 z-50 h-[8vh] pl-4 box-border">
        <section className="relative items-center flex w-[20%] justify-start flex-shrink-0 gap-4 flex-grow-0 h-[100%]">
          <span
            className="hover:bg-stone-800 rounded-full p-2"
            onClick={() => dispatch(toggle())}
          >
            <RxHamburgerMenu size={21} className="cursor-pointer" />
          </span>
          <img
            onClick={() => navigate("/")}
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
                ref={search}
                placeholder="Search"
                value={inputSearch}
                className="text-white w-[90%] bg-black  border-none outline-none h-[100%] "
                onChange={(e) => {
                  setInputSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputSearch !== "") {
                    searchHandler();
                  }
                }}
                onFocus={() => setSuggestionsHidden(false)}
                onBlur={() => {
                  setTimeout(() => {
                    setSuggestionsHidden(true);
                  }, 300);
                  // searchInputRef.current.focus();
                }}
              />
              <RxCross1
                style={{ visibility: inputSearch.length < 1 ? "hidden" : "" }}
                onClick={() => {
                  setInputSearch("");
                  setSuggestionsHidden(true);
                  search.current.focus();
                }}
                className="mr-3 cursor-pointer "
              />
            </span>
            <span
              onClick={() => {
                if (inputSearch?.length > 0) {
                  searchHandler();
                }
              }}
              className=" flex-1 flex items-center bg-stone-900 rounded-r-full justify-center cursor-pointer "
              title="Search"
            >
              <BsSearch color="white" />
            </span>
            {/* -----------------------------------SEARCh SUGGESTIONS */}
            <section
              style={{ display: suggestionsHidden ? "none" : "" }}
              className="absolute bg-stone-800 w-[100%] mt-[6vh] hover:cursor-pointer  rounded-md ml-[-1rem] flex flex-col"
            >
              {searchSuggestions?.map((item) => (
                <span
                  key={item}
                  onClick={() => {
                    // search.current.focus();
                    setInputSearch(item);
                    navigate(
                      `/results?search_query=${item.replaceAll(" ", "+")}`
                    );
                    setTimeout(() => {
                      setInputSearch("");
                    }, 0);
                  }}
                  className="flex gap-2 items-center py-2 px-4 hover:bg-stone-700"
                >
                  <AiOutlineSearch />
                  <p>{item}</p>
                </span>
              ))}
            </section>
          </section>
          <span
            onClick={startListeningHandler}
            className="flex-shrink-0 flex-wrap-0 flex w-[7%] bg-stone-800 items-center justify-center rounded-[50%] py-[0.7rem] cursor-pointer hover:bg-stone-700"
            title="Search with your voice"
          >
            <BsFillMicFill size={18} />
          </span>
        </section>
        <section className="flex-shrink-0 flex-wrap-0 flex w-[20%] h-[80%] relative justify-end pr-4">
          <RxAvatar size={30} />
        </section>
      </div>
    </>
  );
};

export default Header;
