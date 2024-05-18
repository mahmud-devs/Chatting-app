import React from "react";
import Search from "../HomePageCommonComponents/Search";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileImage1 from "../../../../assets/HomePageImage/one.gif";
import ProfileImage2 from "../../../../assets/HomePageImage/two.gif";
import ProfileImage3 from "../../../../assets/HomePageImage/three.gif";
import ProfileImage4 from "../../../../assets/HomePageImage/four.gif";
import ProfileImage5 from "../../../../assets/HomePageImage/five.gif";

const GroupList = () => {
  const users = [
    {
      id: 1,
      image: ProfileImage1,
      title: "Friends Reunion",
      description: "Hi Guys, Wassup!",
      button: "join",
    },
    {
      id: 2,
      image: ProfileImage2,
      title: "Friends Reunion",
      description: "Hi Guys, Wassup!",
      button: "join",
    },
    {
      id: 3,
      image: ProfileImage3,
      title: "Friends Reunion",
      description: "Hi Guys, Wassup!",
      button: "join",
    },
    {
      id: 4,
      image: ProfileImage4,
      title: "Friends Reunion",
      description: "Hi Guys, Wassup!",
      button: "join",
    },
    {
      id: 5,
      image: ProfileImage5,
      title: "Friends Reunion",
      description: "Hi Guys, Wassup!",
      button: "join",
    },
  ];
  return (
    <>
      <div className="w-[32%] ">
        <div >
          <Search className={"w-[100%]"} />
        </div>
        <div className="mt-[18px] w-[100%] rounded-2xl ps-[17px] pt-[17px] shadow-md">
          <div className="flex items-center justify-between pb-[5px] pe-[16px]">
            <h3 className="font-popin text-[20px] font-semibold text-customBlack">
              Groups List
            </h3>
            <BsThreeDotsVertical className="text-[25px] text-btnColor" />
          </div>

          <div className="h-[27vh] divide-y divide-ptext overflow-y-scroll scrollbar-thin pe-3 ">
            {/* =============== chat id ============== */}

            {users?.map((item) => (
              <div
                className="flex items-center justify-between py-[13px] "
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

                <div className="w-[55%]">
                  <h4 className="font-popin text-[18px] font-semibold text-customBlack">
                    Friends Reunion
                  </h4>
                  <p className="text-wrap font-popin text-[14px] text-ptext opacity-75">
                    Hi Guys, Wassup!
                  </p>
                </div>

                <div>
                  <button className="rounded-lg bg-btnColor px-[20px] font-popin text-[20px] font-semibold text-white">
                    Join
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

export default GroupList;