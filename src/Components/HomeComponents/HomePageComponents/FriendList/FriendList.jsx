import React from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileImage1 from "../../../../assets/HomePageImage/one.gif";
import ProfileImage2 from "../../../../assets/HomePageImage/two.gif";
import ProfileImage3 from "../../../../assets/HomePageImage/three.gif";
import ProfileImage4 from "../../../../assets/HomePageImage/four.gif";
import ProfileImage5 from "../../../../assets/HomePageImage/five.gif";

const FriendList = () => {
  const friends = [
    {
      id: 1,
      image: ProfileImage1,
      name: "Raghav",
      messege: "Hi Guys, Wassup!",
      time: "Today, 8:56pm",
      active: true,
    },
    {
      id: 2,
      image: ProfileImage2,
      name: "Swathi",
      messege: "Sure",
      time: "Today, 8:56pm",
      active: false,
    },
    {
      id: 3,
      image: ProfileImage3,
      name: "Kiran",
      messege: "Hi.....",
      time: "Yesterday, 6:22pm",
      active: true,
    },
    {
      id: 4,
      image: ProfileImage4,
      name: "Friends Reunion",
      messege: "Hi Guys, Wassup!",
      time: "Today, 8:56pm",
      active: true,
    },
    {
      id: 5,
      image: ProfileImage5,
      name: "Tejeshwini C",
      messege: "I will call him today.",
      time: "Today, 12:22pm",
      active: false,
    },
  ];
  return (
    <>
      <div className="w-[32%]">
        <div className=" w-[100%] rounded-2xl ps-[17px] pt-[17px] shadow-md">
          <div className="flex items-center justify-between pb-[5px] pe-[16px]">
            <h3 className="font-popin text-[20px] font-semibold text-customBlack">
              Friend List
            </h3>
            <BsThreeDotsVertical className="text-[25px] text-btnColor" />
          </div>

          <div className="h-[37vh] divide-y divide-ptext overflow-y-scroll pe-3 scrollbar-thin">
            {/* =============== chat id ============== */}

            {friends?.map((item) => (
              <div
                className="flex items-center justify-between py-[13px] "
                key={item.id}
              >
                <div className="relative h-[70px] w-[70px] cursor-pointer">
                  <picture>
                    <img
                      className="size-full w-full rounded-full object-cover shadow-lg "
                      src={item.image}
                      alt={ProfileImage1}
                    />
                  </picture>
                  {item.active && (
                    <span class="absolute bottom-1 right-1 flex h-3 w-3">
                      <span class="bg-green absolute inline-flex h-[100%] w-full animate-ping rounded-full opacity-75"></span>
                      <span class="bg-green relative inline-flex h-3 w-3 rounded-full"></span>
                    </span>
                  )}
                </div>

                <div className="w-[44%]">
                  <h4 className="font-popin text-[18px] font-semibold text-customBlack">
                    {item.name ? item.name : "User"}
                  </h4>
                  <p className="text-wrap font-popin text-[14px] text-ptext opacity-75">
                    {item.messege ? item.messege : "messege deleted"}
                  </p>
                </div>

                <p className="w-[29%] font-popin text-[13px] font-medium opacity-50">
                  {item.time ? item.time : "Error time"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendList;
