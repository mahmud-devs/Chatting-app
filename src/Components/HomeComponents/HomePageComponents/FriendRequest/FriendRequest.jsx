import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import ProfileImage4 from "../../../../assets/HomePageImage/four.gif";
import ProfileImage5 from "../../../../assets/HomePageImage/five.gif";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

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

const FriendRequest = () => {
  const [FriendRequestList, setFriendRequestList] = useState([]);
  const [FriendRequestdata, setFriendRequestdata] = useState({});

  const db = getDatabase();
  const auth = getAuth();
  useEffect(() => {
    const starCountRef = ref(db, "/FriendRequest");
    onValue(starCountRef, (snapshot) => {
      const userArry = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().receiverUid) {
          userArry.push({ ...item.val(), userKey: item.key });
        } else if (auth.currentUser.uid === item.val().uid) {
          setFriendRequestdata({ ...item.val(), userKey: item.key });
        }
        // console.log(currentUserdata.userKey);
      });
      setFriendRequestList(userArry);
    });
  }, [db]);
  // console.log(FriendRequestList);

  // handle friend request accept function implementation

  const handleAccept = (item) => {
    let dbFriends = ref(db, "Friends/");
    set(push(dbFriends), {
      ...item,
      createdDate: moment().format("MM//DD/YYYY, h:mm:ss a"),
    })
      .then(() => {
        let dbFriendsAcceptNotifiation = ref(db, "FriendsAcceptNotification/");
        set(push(dbFriendsAcceptNotifiation), {
          ...item,
          createdDate: moment().format("MM//DD/YYYY, h:mm:ss a"),
        });
      })
      .then(() => {
        const friendRequestdbRef = ref(db, `FriendRequest/${item.userKey}`);
        remove(friendRequestdbRef);
      });
  };
  // handle friend request reject function implementation

  const handleReject = (item) => {
    const friendRequestdbRef = ref(db, `FriendRequest/${item.userKey}`);
    remove(friendRequestdbRef);
    let dbFriendsRejectNotifiation = ref(db, "FriendsRejectNotification/");
    set(push(dbFriendsRejectNotifiation), {
      ...item,
      createdDate: moment().format("MM//DD/YYYY, h:mm:ss a"),
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
              {FriendRequestList.length > 0 ? (
                <FaUserFriends className="me-2 animate-pulse text-[20px]" />
              ) : (
                <FaUserFriends className="me-2 text-[20px]" />
              )}
              Friend request
              <div class="absolute  -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red text-xs font-bold text-white">
                {FriendRequestList.length}
              </div>
            </button>
            <BsThreeDotsVertical className="text-[25px] text-btnColor" />
          </div>

          <div className="h-[37vh] divide-y divide-ptext overflow-y-scroll pe-3 scrollbar-thin ">
            {/* =============== chat id ============== */}

            {FriendRequestList.length > 0 ? (
              FriendRequestList?.map((item) => (
                <div className="flex items-center justify-between py-[13px] pe-1">
                  <div className="h-[70px] w-[70px] cursor-pointer">
                    <picture>
                      <img
                        className="size-full w-full rounded-full object-cover shadow-lg "
                        src={
                          item.senderProfilePic
                            ? item.senderProfilePic
                            : ProfileImage4
                        }
                        alt={
                          item.senderProfilePic
                            ? item.senderProfilePic
                            : ProfileImage4
                        }
                      />
                    </picture>
                  </div>

                  <div className="w-[36%]">
                    <h4 className="font-popin text-[18px] font-semibold text-customBlack">
                      {item.senderName ? item.senderName : "user"}
                    </h4>
                    <p className="text-wrap font-popin text-[14px] text-ptext opacity-75">
                      {moment(item.createdDate).fromNow()}
                    </p>
                  </div>

                  <div className="flex gap-x-[6px]">
                    <button
                      onClick={() => handleAccept(item)}
                      className="rounded-md bg-btnColor px-[10px] py-[5px] font-popin text-[16px] font-semibold capitalize text-white"
                    >
                      accept
                    </button>
                    <button
                      onClick={() => handleReject(item)}
                      className="rounded-md bg-red px-[10px] py-[5px] font-popin text-[16px] font-semibold capitalize text-white"
                    >
                      reject
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
                  <span class="font-medium">Info alert!</span> There are no
                  Friend request at the moment
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
