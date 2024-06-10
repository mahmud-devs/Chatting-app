import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getAuth } from "firebase/auth";
import moment from "moment";

import ProfileImage3 from "../../../../assets/HomePageImage/three.gif";

import { getDatabase, ref, onValue, set, push } from "firebase/database";
const MyGroupList = () => {
  // ============= all states ===================
  const [myGroup, setmyGroup] = useState([]);
  // =============== firebase database ================
  const db = getDatabase();
  const auth = getAuth();
  // ================= group list all data ====================
  useEffect(() => {
    const starCountRef = ref(db, "grouplist/");
    onValue(starCountRef, (snapshot) => {
      let myGroupArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().AdminUid) {
          myGroupArr.push(item.val());
        }
      });
      setmyGroup(myGroupArr);
    });
  }, [db]);
  // console.log(myGroup);

  return (
    <>
      <div className="w-[32%]">
        <div className=" w-[100%] rounded-2xl ps-[17px] pt-[17px] shadow-md">
          <div className="flex items-center justify-between pb-[5px] pe-[16px]">
            <h3 className="font-popin text-[20px] font-semibold text-customBlack">
              My Group
            </h3>
            <BsThreeDotsVertical className="text-[25px] text-btnColor" />
          </div>

          <div className="h-[37vh] divide-y divide-ptext overflow-y-scroll pe-3 scrollbar-thin">
            {/* =============== chat id ============== */}

            {myGroup?.map((item) => (
              <div className="flex items-center justify-between py-[13px] ">
                <div className="relative h-[70px] w-[70px] cursor-pointer">
                  <picture>
                    <img
                      className="size-full w-full rounded-full object-cover shadow-lg "
                      src={item.GroupPhotoUrl}
                      alt={item.GroupPhotoUrl}
                    />
                  </picture>
                  {item.active && (
                    <span class="absolute bottom-1 right-1 flex h-3 w-3">
                      <span class="absolute inline-flex h-[100%] w-full animate-ping rounded-full bg-green opacity-75"></span>
                      <span class="relative inline-flex h-3 w-3 rounded-full bg-green"></span>
                    </span>
                  )}
                </div>

                <div className="w-[44%]">
                  <h4 className="font-popin text-[18px] font-semibold text-customBlack">
                    {item.GroupName ? item.GroupName : "Default"}
                  </h4>
                  <p className="text-wrap font-popin text-[14px] text-ptext opacity-75">
                    {item.GroupTagName ? item.GroupTagName : "messege deleted"}
                  </p>
                </div>

                <p className="w-[29%] font-popin text-[13px] font-medium opacity-50">
                  {item.createdDate
                    ? moment(item.createdDate).calendar()
                    : "Error time"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyGroupList;
