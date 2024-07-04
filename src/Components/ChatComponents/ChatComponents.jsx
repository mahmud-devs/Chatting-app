import React from "react";
import GroupList from "../HomeComponents/HomePageComponents/GroupList/GroupList";
import FriendList from "../HomeComponents/HomePageComponents/FriendList/FriendList";
import profilePic from "../../assets/homeLeft/profile.png";
import { BsThreeDotsVertical } from "react-icons/bs";
const ChatComponents = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className=" w-[32%] ">
          <GroupList isChat={true} />
          <FriendList isChat={true} />
        </div>
        <div className="h-[94vh] w-[67%] ps-7  ">
          <div className="h-[100%] w-full rounded-2xl  pt-5 shadow-xl">
            {/* ============================================ */}
            <div className="px-10">
              <div className="mb-7 flex w-full items-center  justify-between border-b-2 border-[rgba(0,0,0,0.3)] pb-5">
                <div className="flex items-center gap-x-10 ">
                  <div className="relative h-[70px] w-[70px] cursor-pointer">
                    <picture>
                      <img
                        className="size-full w-full rounded-full object-cover shadow-lg "
                        src={profilePic}
                        alt={profilePic}
                      />
                    </picture>
                    {navigator.onLine && (
                      <span class="absolute bottom-1 right-1 flex h-3 w-3">
                        <span class="absolute inline-flex h-[100%] w-full animate-ping rounded-full bg-green opacity-75"></span>
                        <span class="relative inline-flex h-3 w-3 rounded-full bg-green"></span>
                      </span>
                    )}
                  </div>
                  {/* ==================== */}
                  <div>
                    <h4 className="font-popin text-[18px] font-semibold text-customBlack">
                      "User"
                    </h4>
                    <p className="text-wrap font-popin text-[14px] text-ptext opacity-75">
                      "messege deleted"
                    </p>
                  </div>
                </div>

                <button>
                  <BsThreeDotsVertical className=" text-[25px] text-btnColor" />
                </button>
              </div>
            </div>
            {/* ======================================================== */}
            <div className="flex h-[70%] w-full flex-col overflow-y-scroll px-10 pt-10 scrollbar-thin">
              <div className="mb-5 self-start">
                <div className=" mb-2 max-w-[350px] font-popin ">
                  <p className="messLeft relative w-fit rounded-xl bg-[#F1F1F1] px-7 py-3 text-[18px]  font-semibold ">
                    Hello Lorem ipsum 
                  </p>
                </div>
                <span>Today, 2:13pm</span>
              </div>
              <div className="mb-5  self-end  ">
                <div className=" mb-2 max-w-[350px] self-end font-popin">
                  <p className="messRight relative w-fit rounded-xl bg-btnColor px-7 py-3 text-[18px] font-semibold  text-white ">
                    Hello Lorem ipsum dolor sit amet consectetur adipisicing
                    elit.
                  </p>
                </div>
                <span className="inline-block w-full text-end">
                  Today, 2:13pm
                </span>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponents;
