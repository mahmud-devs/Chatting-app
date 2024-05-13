import React from "react";
import porfilePic from "../../../assets/homeLeft/profile.png";
import { IoHomeOutline } from "react-icons/io5";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { BsGear } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

const HomeLeft = () => {
  const location = useLocation();
  let active = location.pathname.split("/")[1];
  return (
    <>
      <div className="flex h-[100%] w-[10%] flex-col items-center rounded-3xl bg-btnColor py-9">
        <picture>
          <img src={porfilePic} alt={porfilePic} />
        </picture>
        <ul className="mt-12 flex flex-col items-center gap-3 ps-5  text-[35px] text-white">
          <li
            className={
              active === ""
                ? "relative cursor-pointer rounded-s-2xl bg-white  pb-2 pl-[35px] pr-[56px] pt-3 text-btnColor after:absolute after:right-0 after:top-0 after:h-[100%] after:w-3 after:rounded-s-full after:bg-btnColor"
                : "cursor-pointer pb-2 pr-[26px] pt-3 opacity-80 "
            }
          >
            <Link>
              <IoHomeOutline />
            </Link>
          </li>
          <li
            className={
              active === "chat"
                ? " relative cursor-pointer rounded-s-2xl bg-white pb-2 pl-[35px] pr-[56px] pt-3 text-btnColor after:absolute after:right-0 after:top-0 after:h-[100%] after:w-3 after:rounded-s-full after:bg-btnColor"
                : "cursor-pointer pb-2 pr-[26px] pt-3 opacity-80 "
            }
          >
            <Link to={"/chat"}>
              <IoChatbubbleEllipsesOutline />
            </Link>
          </li>
          <li
            className={
              active === "notification"
                ? " relative cursor-pointer rounded-s-2xl bg-white pb-2 pl-[35px] pr-[56px] pt-3 text-btnColor after:absolute after:right-0 after:top-0 after:h-[100%] after:w-3 after:rounded-s-full after:bg-btnColor"
                : "cursor-pointer pb-2 pr-[26px] pt-3 opacity-80 "
            }
          >
            <Link to={"/notification"}>
              <FaRegBell />
            </Link>
          </li>
          <li
            className={
              active === "setting"
                ? "relative cursor-pointer rounded-s-2xl bg-white pb-2 pl-[35px] pr-[56px] pt-3 text-btnColor after:absolute after:right-0 after:top-0 after:h-[100%] after:w-3 after:rounded-s-full after:bg-btnColor"
                : "cursor-pointer pb-2 pr-[26px] pt-3 opacity-80"
            }
          >
            <Link to={"/setting"}>
              <BsGear />
            </Link>
          </li>
          <li className="mt-10 cursor-pointer pb-2 pr-[26px] pt-3 text-white opacity-100">
            <LuLogOut />
          </li>
        </ul>
      </div>
    </>
  );
};

export default HomeLeft;
