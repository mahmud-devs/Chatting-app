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
    console.log(location.pathname.split("/")[1]);
    let active = location.pathname.split("/")[1];
    return (
        <>
            <div className="w-[10%] h-[100%] bg-btnColor rounded-3xl flex flex-col py-9 items-center">
                <picture>
                    <img src={porfilePic} alt={porfilePic} />
                </picture>
                <ul className="mt-12 text-white text-[35px] flex flex-col gap-3  items-center ps-5">
                    <li
                        className={
                            active === ""
                                ? " bg-white relative text-btnColor pl-[35px] pr-[56px] pt-3 pb-2 rounded-s-2xl cursor-pointer after:h-[100%] after:w-3 after:absolute after:right-0 after:top-0 after:bg-btnColor after:rounded-s-full"
                                : "opacity-80 pr-[26px] pt-3 pb-2 cursor-pointer "
                        }
                    >
                        <Link>
                            <IoHomeOutline />
                        </Link>
                    </li>
                    <li
                        className={
                            active === "chat"
                                ? " bg-white relative text-btnColor pl-[35px] pr-[56px] pt-3 pb-2 rounded-s-2xl cursor-pointer after:h-[100%] after:w-3 after:absolute after:right-0 after:top-0 after:bg-btnColor after:rounded-s-full"
                                : "opacity-80 pr-[26px] pt-3 pb-2 cursor-pointer "
                        }
                    >
                        <Link to={"/chat"}>
                            <IoChatbubbleEllipsesOutline />
                        </Link>
                    </li>
                    <li
                        className={
                            active === "notification"
                                ? " bg-white relative text-btnColor pl-[35px] pr-[56px] pt-3 pb-2 rounded-s-2xl cursor-pointer after:h-[100%] after:w-3 after:absolute after:right-0 after:top-0 after:bg-btnColor after:rounded-s-full"
                                : "opacity-80 pr-[26px] pt-3 pb-2 cursor-pointer "
                        }
                    >
                        <Link to={"/notification"}>
                            <FaRegBell />
                        </Link>
                    </li>
                    <li
                        className={
                            active === "setting"
                                ? "bg-white relative text-btnColor pl-[35px] pr-[56px] pt-3 pb-2 rounded-s-2xl cursor-pointer after:h-[100%] after:w-3 after:absolute after:right-0 after:top-0 after:bg-btnColor after:rounded-s-full"
                                : "opacity-80 pr-[26px] pt-3 pb-2 cursor-pointer"
                        }
                    >
                        <Link to={"/setting"}>
                            <BsGear />
                        </Link>
                    </li>
                    <li className="mt-10 opacity-100 text-white pr-[26px] pt-3 pb-2 cursor-pointer">
                        <LuLogOut />
                    </li>
                </ul>
            </div>
        </>
    );
};

export default HomeLeft;
