import React from "react";
import porfilePic from "../../../assets/homeLeft/profile.png";
import { IoHomeOutline } from "react-icons/io5";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { BsGear } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";

const HomeLeft = ({ active }) => {
    return (
        <>
            <div className="w-[10%] h-[100%] bg-btnColor rounded-3xl flex flex-col py-9 items-center">
                <picture>
                    <img src={porfilePic} alt={porfilePic} />
                </picture>
                <ul className="mt-16 text-white text-[35px] flex flex-col gap-3  items-center ps-5">
                    <li
                        className={
                            active === "home "
                                ? ""
                                : "bg-white text-btnColor pl-[30px] pr-[55px] py-4 rounded-s-2xl cursor-pointer border-e-8 border-customBlack rounded-e-lg"
                        }
                    >
                        <IoHomeOutline />
                    </li>
                    <li className="opacity-80 pr-[26px] py-4 cursor-pointer">
                        <IoChatbubbleEllipsesOutline />
                    </li>
                    <li className="opacity-80 pr-[26px] py-4 cursor-pointer">
                        <FaRegBell />
                    </li>
                    <li className="opacity-80 pr-[26px] py-4 cursor-pointer">
                        <BsGear />
                    </li>
                    <li className="mt-10 opacity-100 text-white pr-[26px] py-4 cursor-pointer">
                        <LuLogOut />
                    </li>
                </ul>
            </div>
        </>
    );
};

export default HomeLeft;
