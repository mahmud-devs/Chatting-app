import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileImage1 from "../../../../assets/HomePageImage/one.gif";
import ProfileImage2 from "../../../../assets/HomePageImage/two.gif";
import ProfileImage3 from "../../../../assets/HomePageImage/three.gif";
import ProfileImage4 from "../../../../assets/HomePageImage/four.gif";
import ProfileImage5 from "../../../../assets/HomePageImage/five.gif";
import { FaPlus } from "react-icons/fa";

const UserList = () => {
  const users = [
    {
      id: 1,
      image: ProfileImage4,
      name: "Swathi",
      time: "Today, 8:56pm",
      button: "join",
    },
    {
      id: 2,
      image: ProfileImage3,
      name: "Tejeshwini C",
      time: "Today, 12:22pm",
      button: "join",
    },
    {
      id: 3,
      image: ProfileImage5,
      name: "Marvin McKinney",
      time: "Today, 8:56pm",
      button: "join",
    },
    {
      id: 4,
      image: ProfileImage2,
      name: "Raghav",
      time: "Today, 8:56pm",
      button: "join",
    },
    {
      id: 5,
      image: ProfileImage1,
      name: "Kiran",
      time: "Yesterday, 6:22pm",
      button: "join",
    },
  ];
  return (
    <>
      <div className="w-[32%]">
        <div className=" w-[100%] rounded-2xl ps-[17px] pt-[17px] shadow-md">
          <div className="flex items-center justify-between pb-[5px] pe-[16px]">
            <h3 className="font-popin text-[20px] font-semibold text-customBlack">
              User List
            </h3>
            <BsThreeDotsVertical className="text-[25px] text-btnColor" />
          </div>

          <div className="h-[37vh] divide-y divide-ptext overflow-y-scroll pe-3 scrollbar-thin ">
            {/* =============== chat id ============== */}

            {users?.map((item) => (
              <div
                className="flex items-center justify-between py-[13px] pe-[30px]"
                key={item.id}
              >
                <div className="h-[70px] w-[70px] cursor-pointer">
                  <picture>
                    <img
                      className="size-full w-full rounded-full object-cover shadow-lg "
                      src={item.image}
                      alt={ProfileImage1}
                    />
                  </picture>
                </div>

                <div className="w-[64%]">
                  <h4 className="font-popin text-[18px] font-semibold text-customBlack">
                    {item.name ? item.name : "User"}
                  </h4>
                  <p className="text-wrap font-popin text-[13px] font-medium text-customBlack opacity-50">
                    {item.time? item.time:"Date expired"}
                  </p>
                </div>

                <div>
                  <button className="rounded-lg bg-btnColor p-[8px] font-popin text-[15px] font-semibold text-white">
                    <FaPlus />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
