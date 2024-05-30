import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileImage1 from "../../../../assets/HomePageImage/one.gif";
import ProfileImage2 from "../../../../assets/HomePageImage/two.gif";
import ProfileImage3 from "../../../../assets/HomePageImage/three.gif";
import ProfileImage4 from "../../../../assets/HomePageImage/four.gif";
import ProfileImage5 from "../../../../assets/HomePageImage/five.gif";

import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";

const BlockedUsers = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [blockList, setblockList] = useState([]);

  // =============== read data from blockList database ===============
  useEffect(() => {
    const blockdbRef = ref(db, "Block/");
    onValue(blockdbRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((item) => {
        if(auth.currentUser.uid === item.val().blockedByuid ){
          blockArr.push({ ...item.val(), friendKey: item.key });
        }
        
      });
      console.log(blockArr);
      setblockList(blockArr);
    });
  }, [db]);

 
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

            {blockList?.map((item) => (
              <div
                className="flex items-center justify-between py-[13px] pe-6"
                
              >
                <div className="h-[70px] w-[70px] cursor-pointer">
                  <picture>
                    <img
                      className="size-full w-full rounded-full object-cover shadow-lg "
                      src={item.blockedUserProfilePic}
                      alt={item.blockedUserProfilePic}
                    />
                  </picture>
                </div>

                <div className="w-[44%]">
                  <h4 className="font-popin text-[18px] font-semibold text-customBlack">
                    {item.blockedUserName ? item.blockedUserName : "user"}
                  </h4>
                  <p className="text-wrap font-popin text-[14px] text-ptext opacity-75">
                    {moment(item.createdDate).fromNow()}
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
