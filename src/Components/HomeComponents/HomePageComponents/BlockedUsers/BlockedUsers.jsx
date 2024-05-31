import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileImage1 from "../../../../assets/HomePageImage/one.gif";
import { FaUsers } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";

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
        if (auth.currentUser.uid === item.val().blockedByuid) {
          blockArr.push({ ...item.val(), BlockListKey: item.key });
        }
      });
      // console.log(blockArr);
      setblockList(blockArr);
    });
  }, [db]);

  // console.log(blockList);

  // =====================================
  // todo: handle unblock function implementatiom
  // @params(item)

  const handleUnblock = (item) => {
    // console.log(item);
    let dbFriendList = ref(db, "Friends/");
    set(push(dbFriendList), {
      senderEmail: item.blockedUserEmail ,
      senderName: item.blockedUserName,
      senderUid: item.blockedUseruid,
      senderProfilePic: item.blockedUserProfilePic,
      receiverUid: auth.currentUser.uid,
      receiverEmail: auth.currentUser.email,
      receiverName: auth.currentUser.displayName,
      createdDate: moment().format("MM//DD/YYYY, h:mm:ss a"),
    }).then(() => {
      const blockListdbRef = ref(db, `Block/${item.BlockListKey}`);
      remove(blockListdbRef);
      
    }).then(() => {
      toast.success(`${item.blockedUserName} Unblocked`, {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    });
  };

  return (
    <>
      <div className="w-[32%]">
        <div className=" w-[100%] rounded-2xl ps-[17px] pt-[17px] shadow-md">
          <div className="flex items-center justify-between pb-[5px] pe-[16px]">
            <button
              type="button"
              class="relative  inline-flex items-center rounded-lg bg-btnColor px-5 py-2.5 text-center text-[17px] font-medium text-white focus:outline-none focus:ring-4 focus:ring-btnColor"
            >
              <FaUsers className="me-2 text-[20px]" />
              Blocked Users
              <div class="absolute  -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red text-xs font-bold text-white">
                {blockList.length}
              </div>
            </button>
            <BsThreeDotsVertical className="text-[25px] text-btnColor" />
          </div>

          <div className="h-[37vh] divide-y divide-ptext overflow-y-scroll pe-3 scrollbar-thin ">
            {/* =============== chat id ============== */}

            {blockList?.map((item) => (
              <div className="flex items-center justify-between py-[13px] pe-6">
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
                  <button
                    onClick={() => handleUnblock(item)}
                    className="rounded-lg bg-btnColor px-[10px] font-popin text-[20px] font-semibold text-white"
                  >
                    Unblock
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
