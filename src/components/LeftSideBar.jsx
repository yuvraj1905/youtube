import { BiHomeAlt2, BiLike, BiNews, BiShoppingBag } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { VscHistory } from "react-icons/vsc";
import { PiFilmSlate, PiMusicNoteBold } from "react-icons/pi";
import { TfiWorld } from "react-icons/tfi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiYoutubegaming } from "react-icons/si";
import { ImFire } from "react-icons/im";
import { Link, NavLink } from "react-router-dom";

export const LeftSideBar = () => {
  const mainTags = [
    [<BiHomeAlt2 size={20} />, "Home"],
    [<BiLike size={20} />, "Liked videos"],
    [<VscHistory size={20} />, "History"],
    [<AiOutlineClockCircle size={20} />, "Watch later"],
  ];
  const explore = [
    [<ImFire size={20} />, "Trending"],
    [<BiShoppingBag size={20} />, "Shopping"],
    [<PiMusicNoteBold size={20} />, "Music"],
    [<SiYoutubegaming size={20} />, "Gaming"],
    [<PiFilmSlate size={20} />, "Movies"],
    [<BiNews size={20} />, "News"],
  ];
  const sub = [
    {
      src: "https://yt3.googleusercontent.com/ytc/AOPolaSj48pypV9ilqNUztYjQ8Q760NYCAw3w1LwoWbJYQ=s176-c-k-c0x00ffffff-no-rj",
      username: "@akshaymarch7",
      fullname: "Akshay Saini",
    },
    {
      src: "https://yt3.googleusercontent.com/X9eoDIB9cgb1s-kvATRs1lQDcU4Fjc15NDV9s9FF8ck7IsA8u7OdijaernoDV9LLdePgjlt_=s176-c-k-c0x00ffffff-no-rj",
      username: "@warikoo",
      fullname: "Warikoo",
    },
    {
      src: "https://yt3.googleusercontent.com/G42b4i9auAhu-cy3wi9IhLxmkfl2i_iokiVgHx32xsZ8I4ok6uzamWXUj16xzJmAGoq8fRfS1Q=s176-c-k-c0x00ffffff-no-rj",
      username: "@RoadsideCoder",
      fullname: "RoadsideCoder",
    },
  ];

  const moreFromYoutube = [
    {
      src: "https://res.cloudinary.com/yuvraj1905/image/upload/v1691578133/ytstudio_hgy0u6.jpg",
      url: "https://studio.youtube.com",
      fullname: "Youtube Studio",
    },
    {
      src: "https://res.cloudinary.com/yuvraj1905/image/upload/v1691577937/youtubemusic-1324440259684990025_yzshal.png",
      url: "https://music.youtube.com",
      fullname: "Youtube Music",
    },
    {
      src: "https://res.cloudinary.com/yuvraj1905/image/upload/v1691579062/ytkids_bepkge.jpg",
      url: "https://youtubekids.com",
      fullname: "Youtube Kids",
    },
  ];
  return (
    <div className="w-[15%] text-white px-2 py-2 min-h-[92vh] max-h-[92vh] fixed flex items-center flex-col overflow-auto scrollBar pt-0">
      <ListMaker list={mainTags} />
      <h1 className="px-4 py-2 mt-2 font-bold self-start">Explore</h1>
      <ListMaker list={explore} />
      <h1 className="px-4 py-2 mt-2 font-bold self-start">Popular </h1>
      <SubListMaker list={sub} />
      <h1 className="px-4 py-2 mt-2 font-bold self-start">More from YouTube</h1>
      <ListMakerLinks list={moreFromYoutube} />
      <h1 className="px-4 py-2 mt-2 font-bold self-start">About Us</h1>
      <section className="flex mt-4 justify-between mb-2 gap-4 self-start px-4">
        <Link to="https://www.linkedin.com/in/yuvraj1905/" target="_blank">
          <FaLinkedin size={20} />
        </Link>
        <Link to="https://twitter.com/yuvrajt1905" target="_blank">
          <FaTwitter size={20} />
        </Link>
        <Link to="https://github.com/yuvraj1905" target="_blank">
          <FaGithub size={20} />
        </Link>
        <Link
          to="https://personal-portfolio-neogcamp.netlify.app/"
          target="_blank"
        >
          <TfiWorld size={20} />
        </Link>
      </section>
      <small className="px-4 py-1 self-start text-stone-400">
        Note: This app is still under development. Please let me know if you
        find bugs out here.{" "}
      </small>
      <small className="px-4 py-1 self-start">© Yuvraj Kumar </small>
    </div>
  );
};

const ListMaker = ({ list }) => {
  const navlinkStyler = ({ isActive }) => ({
    backgroundColor: isActive && "rgb(41 37 36)",
  });
  return (
    <>
      <ul className="relative w-[100%] py-2 border-b border-stone-700 ">
        {list.map((tag) => (
          <NavLink
            className="hover:bg-stone-800 flex px-4 py-2 w-[100%] font-semibold mb-1 rounded-md  gap-6 items-center"
            key={tag[1]}
            style={navlinkStyler}
            to={`/${tag[1].replaceAll(" ", "").toLowerCase()}`}
          >
            {tag[0]}
            <p className="">{tag[1]}</p>
          </NavLink>
        ))}
      </ul>
    </>
  );
};

const SubListMaker = ({ list }) => {
  const navlinkStyler = ({ isActive }) => ({
    backgroundColor: isActive && "rgb(41 37 36)",
  });
  return (
    <>
      <ul className="relative w-[100%] pb-2 border-b border-stone-700">
        {list.map((obj) => {
          const { src, username, fullname } = obj;

          return (
            <NavLink
              className="hover:bg-stone-800 flex px-4 py-2 w-[95%] font-semibold  rounded-md relative gap-5 items-center"
              key={username}
              style={navlinkStyler}
              to={`${username}`}
            >
              <img
                src={src}
                alt=""
                className="object-contain rounded-full h-[1.5rem]"
              />
              <p className=""> {fullname}</p>
            </NavLink>
          );
        })}
      </ul>
    </>
  );
};

const ListMakerLinks = ({ list }) => {
  return (
    <>
      <ul className="relative w-[100%] pb-2 border-b border-stone-700">
        {list.map((obj) => {
          const { src, url, fullname } = obj;

          return (
            <Link
              className="hover:bg-stone-800 flex px-4 py-2 w-[95%] font-semiboldbold  rounded-md relative gap-5 items-center"
              key={url}
              to={url}
              target="_blank"
            >
              <img
                src={src}
                alt=""
                className="object-contain rounded-full h-[1.5rem]"
              />
              <p className=" "> {fullname}</p>
            </Link>
          );
        })}
      </ul>
    </>
  );
};
