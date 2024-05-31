import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProfileImage1 from "../../../../assets/HomePageImage/one.gif";
import { FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";

import { ToastContainer, toast, Bounce } from "react-toastify";
// ============= user list ================

const UserList = () => {
  const [UserList, setUserList] = useState([]);
  const [currentUserdata, setcurrentUserdata] = useState({});
  const [FriendRequestUser, setFriendRequestUser] = useState([]);
  const [FriendsUser, setFriendsUser] = useState([]);
  const [blockList, setblockList] = useState([]);
  const db = getDatabase();
  const auth = getAuth();
  useEffect(() => {
    const starCountRef = ref(db, "/users");
    onValue(starCountRef, (snapshot) => {
      const userArry = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid !== item.val().uid) {
          userArry.push({ ...item.val(), userKey: item.key });
        } else if (auth.currentUser.uid === item.val().uid) {
          setcurrentUserdata({ ...item.val(), userKey: item.key });
        }
        // console.log(currentUserdata);
      });
      setUserList(userArry);
    });
  }, [db]);
  // console.log(currentUserdata.profile_picture);
  // console.log(moment().format("MM//DD/YYYY, h:mm:ss a"));

  // todo: handle friend request function implementation
  // @params (item)
  //
  const handleFriendRequest = (item) => {
    let dbFriendReq = ref(db, "FriendRequest/");
    set(push(dbFriendReq), {
      senderUid: auth.currentUser.uid,
      senderName: auth.currentUser.displayName,
      senderEmail: auth.currentUser.email,
      senderKey: currentUserdata.userKey,
      senderProfilePic: currentUserdata.profile_picture,
      receiverUid: item.uid,
      receiverEmail: item.email,
      receiverName: item.username,
      receiverKey: item.userKey,
      receiverProfilePic: item.profile_picture,
      createdDate: moment().format("MM//DD/YYYY, h:mm:ss a"),
    }).then(() => {
      toast.success("👥 Friend request Sent!", {
        position: "top-left",
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

  // =============== read data from FriendRequest database ===============

  useEffect(() => {
    const FriendRequestdbRef = ref(db, "FriendRequest/");
    onValue(FriendRequestdbRef, (snapshot) => {
      let friendRequestArr = [];
      snapshot.forEach((item) => {
        friendRequestArr.push(item.val().senderUid + item.val().receiverUid);
      });
      setFriendRequestUser(friendRequestArr);
    });
  }, [db]);
  // console.log(FriendRequestUser);
  // =============== read data from Friends database ===============
  useEffect(() => {
    const FriendsdbRef = ref(db, "Friends/");
    onValue(FriendsdbRef, (snapshot) => {
      let friendsArr = [];
      snapshot.forEach((item) => {
        friendsArr.push(item.val().senderUid + item.val().receiverUid);
      });
      setFriendsUser(friendsArr);
      // console.log(friendsArr);
    });
  }, [db]);

  // console.log(FriendsUser);

  // =============== read data from blockList database ===============
  useEffect(() => {
    const blockdbRef = ref(db, "Block/");
    onValue(blockdbRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((item) => {
        blockArr.push(item.val().blockedUseruid + item.val().blockedByuid);
      });
      // console.log(blockArr);
      setblockList(blockArr);
    });
  }, [db]);

  return (
    <>
      <div className="w-[32%]">
        <div className=" w-[100%] rounded-2xl ps-[17px] pt-[17px] shadow-md">
          <div className="flex items-center justify-between pb-[5px] pe-[16px]">
            <button
              type="button"
              class="relative  inline-flex items-center rounded-lg bg-btnColor px-5 py-2.5 text-center text-[17px] font-medium text-white focus:outline-none focus:ring-4 focus:ring-btnColor"
            >
              <FaUsers className="me-2 animate-pulse text-[20px]" />
              User list
              <div class="absolute  -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red text-xs font-bold text-white">
                {UserList.length}
              </div>
            </button>
            <BsThreeDotsVertical className="text-[25px] text-btnColor" />
          </div>

          <div className="h-[37vh] divide-y divide-ptext overflow-y-scroll pe-3 scrollbar-thin ">
            {/* =============== chat id ============== */}

            {UserList.length > 0 ? (
              UserList?.map((item) => (
                <div
                  className="flex items-center justify-between py-[13px] pe-[30px]"
                  key={item.id}
                >
                  <div className="h-[70px] w-[70px] cursor-pointer">
                    <picture>
                      <img
                        className="size-full w-full rounded-full object-cover shadow-lg "
                        src={
                          item.profile_picture
                            ? item.profile_picture
                            : ProfileImage1
                        }
                        alt={item.profile_picture}
                      />
                    </picture>
                  </div>

                  <div className="w-[64%]">
                    <h4 className="font-popin text-[18px] font-semibold capitalize text-customBlack">
                      {item.username ? item.username : "User"}
                    </h4>
                    <p className="text-wrap font-popin text-[13px] font-medium text-customBlack opacity-50">
                      {moment(item.createdDate).calendar()}
                    </p>
                  </div>

                  {blockList.includes(auth.currentUser.uid + item.uid) ? (
                    <div className="relative">
                      {/* ======================== first layer  ======================== */}
                      <button className="rounded-lg  bg-btnColor p-[8px] font-popin text-[15px] font-semibold text-white">
                        <FaUserFriends />
                      </button>
                      <div className="absolute left-2/4 top-[-9%] h-[118%] w-[3px] -translate-x-1/2 rotate-[135deg] rounded-sm bg-white"></div>
                    </div>
                  ) : FriendsUser.includes(auth.currentUser.uid + item.uid) ? (
                    <div>
                      {/* ======================== second layer  ======================== */}

                      <button className="rounded-lg bg-btnColor p-[8px] font-popin text-[15px] font-semibold text-white">
                        <FaUserFriends />
                      </button>
                    </div>
                  ) : FriendRequestUser.includes(
                      auth.currentUser.uid + item.uid,
                    ) ? (
                    <div>
                      {/* ======================== third layer  ======================== */}

                      <button className="rounded-lg bg-btnColor p-[8px] font-popin text-[15px] font-semibold text-white">
                        <FaMinus />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => handleFriendRequest(item)}
                        className="rounded-lg bg-btnColor p-[8px] font-popin text-[15px] font-semibold text-white"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex h-[100%] w-full items-center justify-center">
                <div
                  class="mb-4 rounded-lg  bg-[rgba(98,128,236,0.16)] p-4 text-sm text-darkBlue"
                  role="alert"
                >
                  <span class="font-medium">Info alert!</span> There are no
                  users at the moment
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
