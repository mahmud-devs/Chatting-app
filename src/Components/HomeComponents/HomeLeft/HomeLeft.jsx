import React, { useState } from "react";
import porfilePic from "../../../assets/homeLeft/profile.png";
import { IoHomeOutline } from "react-icons/io5";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { BsGear } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { FaCloudArrowUp } from "react-icons/fa6";

import { Uploader } from "uploader";

const HomeLeft = () => {
  const location = useLocation();
  let active = location.pathname.split("/")[1];

  // ========== all states ==========

  const [photoUrl, setphotoUrl] = useState("");

  // ========= image uploader ============
  const uploader = Uploader({
    apiKey: "free",
  });

  // ==========handle image uploaderr ============

  const handleImageUploader = () => {
    uploader
      .open({ multi: false, mimeTypes: ["image/*"] })
      .then((files) => {
        if (files.length === 0) {
          console.log("No files selected.");
        } else {
          setphotoUrl(files[0].fileUrl);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log(photoUrl, "link paisi");
  return (
    <>
      <div className="flex h-[100%] w-[10%] flex-col  items-center rounded-3xl  bg-btnColor py-9">
        <div
          className="relative h-[100px] w-[100px] rounded-full bg-customBlack "
          onClick={handleImageUploader}
        >
          <picture>
            <img
              className="h-[100%] w-[100%] rounded-full object-cover"
              src={photoUrl? photoUrl : porfilePic}
              alt={porfilePic}
            />
          </picture>
          <div className="absolute left-0 top-0 flex h-[100%] w-[100%] cursor-pointer items-center justify-center rounded-full border-[4px] border-white bg-[#000000a3]  opacity-0 transition-all duration-300 hover:opacity-100">
            <FaCloudArrowUp className="text-[30px] text-white" />
          </div>
        </div>

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
