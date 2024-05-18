import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileImage1 from "../../../../assets/HomePageImage/one.gif";
import ProfileImage2 from "../../../../assets/HomePageImage/two.gif";
import ProfileImage3 from "../../../../assets/HomePageImage/three.gif";
import ProfileImage4 from "../../../../assets/HomePageImage/four.gif";
import ProfileImage5 from "../../../../assets/HomePageImage/five.gif";

const BlockedUsers = () => {
  const blockedUsers = [
    {
      id: 1,
      image: ProfileImage1,
      name: "Raghav",
      messege: "Dinner?",
      button: "Unblock",
    },
    {
      id: 2,
      image: ProfileImage2,
      name: "Swathi",
      messege: "Sure!",
      button: "Unblock",
    },
    {
      id: 3,
      image: ProfileImage3,
      name: "Kiran",
      messege: "Hi.....",
      button: "Unblock",
    },
    {
      id: 4,
      image: ProfileImage4,
      name: "Tejeshwini C",
      messege: "I will call him today.",
      button: "Unblock",
    },
  ];
  return (
    <>
      <div className="w-[32%]">
        <div className=" w-[100%] rounded-2xl ps-[17px] pt-[17px] shadow-md">
          <div className="flex items-center justify-between pb-[5px] pe-[16px]">
            <h3 className="font-popin text-[20px] font-semibold text-customBlack">
            Blocked Users
            </h3>
            <BsThreeDotsVertical className="text-[25px] text-btnColor" />
          </div>

          <div className="h-[37vh] divide-y divide-ptext overflow-y-scroll pe-3 scrollbar-thin ">
            {/* =============== chat id ============== */}

            {blockedUsers?.map((item) => (
              <div
                className="flex items-center justify-between py-[13px] pe-6"
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

                <div className="w-[44%]">
                  <h4 className="font-popin text-[18px] font-semibold text-customBlack">
                    {item.name ? item.name : "user"}
                  </h4>
                  <p className="text-wrap font-popin text-[14px] text-ptext opacity-75">
                    {item.messege ? item.messege : "Hello!"}
                  </p>
                </div>

                <div>
                  <button className="rounded-lg bg-btnColor px-[10px] font-popin text-[20px] font-semibold text-white">
                    {item.button ? item.button : "Unblock"}
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

export default BlockedUsers;
