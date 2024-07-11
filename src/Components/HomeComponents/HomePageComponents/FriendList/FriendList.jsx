import React, { useEffect, useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileImage1 from "../../../../assets/HomePageImage/one.gif";
import ProfileImage2 from "../../../../assets/HomePageImage/two.gif";
import ProfileImage3 from "../../../../assets/HomePageImage/three.gif";
import { FaUserFriends } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";

// ==================react redux ===================

import { useSelector,useDispatch } from "react-redux";
import { friendsData } from "../../../../Features/Redux/FriendSlice/FriendSlice";

// =============
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

const FriendList = ({ isChat = false }) => {
  const db = getDatabase();
  const auth = getAuth();
  const [FriendsData, setFriendsData] = useState([]);
  const dispatch = useDispatch()
  // =============

  // =============== read data from Friends database ===============
  useEffect(() => {
    const FriendsdbRef = ref(db, "Friends/");
    onValue(FriendsdbRef, (snapshot) => {
      let friendsArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().receiverUid) {
          friendsArr.push({ ...item.val(), friendKey: item.key });
        }
      });
      // console.log(friendsArr);
      setFriendsData(friendsArr);
    });
  }, [db]);
  // console.log(auth.currentUser);

  // =============== handle block function implementaion =============

  const handleBlock = (item) => {
    // console.log(item);
    let dbBlockList = ref(db, "Block/");
    set(push(dbBlockList), {
      blockedByuid: auth.currentUser.uid,
      blockedByName: auth.currentUser.displayName,
      blockedByEmail: auth.currentUser.email,
      blockedByProfilePic: item.receiverProfilePic,
      blockedUseruid: item.senderUid,
      blockedUserName: item.senderName,
      blockedUserEmail: item.senderEmail,
      blockedUserProfilePic: item.senderProfilePic,
      createdDate: moment().format("MM//DD/YYYY, h:mm:ss a"),
    })
      .then(() => {
        let dbBlockListNotification = ref(db, "AllNotification/");
        set(push(dbBlockListNotification), {
          NotificationName: auth.currentUser.displayName,
          NotificationProfilePic: item.receiverProfilePic,
          NotificationReceiverUid: item.senderUid,
          NotificationMessege: `${auth.currentUser.displayName} Has blocked you!`,

          createdDate: moment().format("MM//DD/YYYY, h:mm:ss a"),
        });
      })
      .then(() => {
        const blockListdbRef = ref(db, `Friends/${item.friendKey}`);
        remove(blockListdbRef);
      })
      .then(() => {
        toast.error(`${item.senderName} Blocked`, {
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

  // ======================= redux friend info ======================

  const handleFriendInfo = (item) => {
    console.log(item);
    dispatch(friendsData(item))
  };

  // useSelector((state) => console.log(state))

  return (
    <>
      <div className={`${isChat ? "mt-[10px] w-full" : "w-[32%] "}`}>
        <div className=" w-[100%] rounded-2xl ps-[17px] pt-[17px] shadow-md">
          <div className="flex items-center justify-between pb-[5px] pe-[16px]">
            <button
              type="button"
              class="relative  inline-flex items-center rounded-lg bg-btnColor px-5 py-2.5 text-center text-[17px] font-medium text-white focus:outline-none focus:ring-4 focus:ring-btnColor"
            >
              <FaUserFriends className="me-2 text-[20px]" />
              Friends
              <div class="absolute  -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red text-xs font-bold text-white">
                {FriendsData.length}
              </div>
            </button>

            <BsThreeDotsVertical className="text-[25px] text-btnColor" />
          </div>

          <div className="h-[37vh] divide-y divide-ptext overflow-y-scroll pe-3 scrollbar-thin">
            {/* =============== chat id ============== */}

            {FriendsData.length > 0 ? (
              FriendsData?.map((item) => (
                <div
                  onClick={() => handleFriendInfo(item)}
                  className="flex cursor-pointer items-center justify-between py-[13px] "
                >
                  <div className="relative h-[70px] w-[70px] cursor-pointer">
                    <picture>
                      <img
                        className="size-full w-full rounded-full object-cover shadow-lg "
                        src={
                          item.senderProfilePic
                            ? item.senderProfilePic
                            : ProfileImage3
                        }
                        alt={ProfileImage1}
                      />
                    </picture>
                    {navigator.onLine && (
                      <span class="absolute bottom-1 right-1 flex h-3 w-3">
                        <span class="absolute inline-flex h-[100%] w-full animate-ping rounded-full bg-green opacity-75"></span>
                        <span class="relative inline-flex h-3 w-3 rounded-full bg-green"></span>
                      </span>
                    )}
                  </div>

                  <div className="w-[44%]">
                    <h4 className="font-popin text-[18px] font-semibold text-customBlack">
                      {item.senderName ? item.senderName : "User"}
                    </h4>
                    <p className="text-wrap font-popin text-[14px] text-ptext opacity-75">
                      {item.messege ? item.messege : "messege deleted"}
                    </p>
                  </div>
                  <div className="flex w-[29%] flex-col items-center justify-center gap-y-2">
                    <p className=" font-popin text-[13px] font-medium opacity-50">
                      {moment(item.createdDate).fromNow()}
                    </p>
                    <button
                      onClick={() => handleBlock(item)}
                      className="rounded-lg bg-btnColor p-[8px] font-popin text-[15px] font-semibold text-white"
                    >
                      Block
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-[100%] w-full items-center justify-center">
                <div
                  class="mb-4 rounded-lg  bg-[rgba(98,128,236,0.16)] p-4 text-sm text-darkBlue"
                  role="alert"
                >
                  <span class="font-medium">Info alert!</span> You have no
                  Friends at the moment
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendList;
