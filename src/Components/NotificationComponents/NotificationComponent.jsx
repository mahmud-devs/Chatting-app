import React, { useEffect, useState } from "react";
import Search from "../HomeComponents/HomePageComponents/HomePageCommonComponents/Search";
import profilepic from "../../assets/HomePageImage/three.gif";
// ================ firebase import =================
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
const NotificationComponent = () => {
  // ============ firebase database and auth ===============
  const db = getDatabase();
  const auth = getAuth();

  // ===================== all states =================
  const [FriendReqNotification, setFriendReqNotification] = useState([]);
  const [FriendReqAcceptNotification, setFriendReqAcceptNotification] =
    useState([]);
  const [FriendReqRejectNotification, setFriendReqRejectNotification] =
    useState([]);
  const [JoinGroupReqNotification, setJoinGroupReqNotification] = useState([]);

  // ================== read data from friend request  notification ==================
  useEffect(() => {
    const FriendReqNotificationdbRef = ref(db, "FriendRequestNotification/");
    onValue(FriendReqNotificationdbRef, (snapshot) => {
      let FriendReqNotificationdArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().receiverUid) {
          FriendReqNotificationdArr.push({
            ...item.val(),
            BlockListKey: item.key,
          });
        }
      });
      // console.log(blockArr);
      setFriendReqNotification(FriendReqNotificationdArr);
    });
  }, [db]);
  // ================== read data from friend request accept notification ==================
  useEffect(() => {
    const FriendReqAcceptNotificationdbRef = ref(
      db,
      "FriendsAcceptNotification/",
    );
    onValue(FriendReqAcceptNotificationdbRef, (snapshot) => {
      let FriendReqAcceptNotificationdArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().senderUid) {
          FriendReqAcceptNotificationdArr.push({
            ...item.val(),
            FriendReqAcceptNotificationKey: item.key,
          });
        }
      });
      // console.log(blockArr);
      setFriendReqAcceptNotification(FriendReqAcceptNotificationdArr);
    });
  }, [db]);
  // ================== read data from friend request reject notification ==================
  useEffect(() => {
    const FriendReqRejectNotificationdbRef = ref(
      db,
      "FriendsRejectNotification/",
    );
    onValue(FriendReqRejectNotificationdbRef, (snapshot) => {
      let FriendReqRejectNotificationdArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().senderUid) {
          FriendReqRejectNotificationdArr.push({
            ...item.val(),
            FriendReqRejectNotificationKey: item.key,
          });
        }
      });
      // console.log(blockArr);
      setFriendReqRejectNotification(FriendReqRejectNotificationdArr);
    });
  }, [db]);
  // ================== read data from group join request notification ==================
  useEffect(() => {
    const joinGroupReqNotificationdbRef = ref(
      db,
      "joinGroupRequestNotification/",
    );
    onValue(joinGroupReqNotificationdbRef, (snapshot) => {
      let joinGroupReqNotificationArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().AdminUid) {
          joinGroupReqNotificationArr.push({
            ...item.val(),
            joinGroupReqNotificationKey: item.key,
          });
        }
      });
      // console.log(blockArr);
      setJoinGroupReqNotification(joinGroupReqNotificationArr);
    });
  }, [db]);
  // console.log(JoinGroupReqNotification);
  return (
    <>
      <div>
        <Search />
      </div>
      <div className="b mt-10 h-[80vh] w-full overflow-y-scroll  scrollbar-thin">
        <div className="flex h-[100%] w-full flex-col gap-y-5 ">
          {/* ================= join group request notification ==================== */}
          {JoinGroupReqNotification?.map((item) => (
            <div class="flex items-start gap-2.5">
              <img
                src={item.whoWantsToJoinPhoto}
                alt="profilepic"
                className="h-[80px] w-[80px] rounded-full shadow-lg"
              />
              <div class="leading-1.5  flex  w-full max-w-[90%] flex-col rounded-e-xl rounded-es-xl bg-[#F3F4F6] p-4">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span class="text-md font-semibold capitalize text-customBlack ">
                    {item.whoWantsToJoinName}
                  </span>
                  <span class="text-md  font-normal text-customBlack">
                    {moment(item.createdDate).fromNow()}
                  </span>
                </div>
                <p class="text-md capitaliz py-2.5 font-normal text-customBlack ">
                  <span className="pe-2 font-bold capitalize">
                    {item.whoWantsToJoinName}
                  </span>
                  wants to join group
                  <span className="ps-2 font-bold capitalize">
                    {item.GroupName}
                  </span>
                </p>
              </div>
            </div>
          ))}
          {/* ================= join group request notification ==================== */}

          {/* ================= friend request accept notification ==================== */}
          {FriendReqAcceptNotification?.map((item) => (
            <div class="flex items-start gap-2.5">
              <img
                src={item.receiverProfilePic}
                alt="profilepic"
                className="h-[80px] w-[80px] rounded-full shadow-lg"
              />
              <div class="leading-1.5  flex  w-full max-w-[90%] flex-col rounded-e-xl rounded-es-xl bg-[#F3F4F6] p-4">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span class="text-md font-semibold capitalize text-customBlack ">
                    {item.receiverName}
                  </span>
                  <span class="text-md  font-normal text-customBlack">
                    {moment(item.createdDate).fromNow()}
                  </span>
                </div>
                <p class="text-md capitaliz py-2.5 font-normal text-customBlack ">
                  <span className="pe-2 font-bold capitalize">
                    {item.receiverName}
                  </span>
                  accepted your friend request
                </p>
              </div>
            </div>
          ))}
          {/* ================= friend request accept notification ==================== */}

          {/* ================= friend request reject notification ==================== */}
          {FriendReqRejectNotification?.map((item) => (
            <div class="flex items-start gap-2.5">
              <img
                src={item.receiverProfilePic}
                alt="profilepic"
                className="h-[80px] w-[80px] rounded-full shadow-lg"
              />
              <div class="leading-1.5  flex  w-full max-w-[90%] flex-col rounded-e-xl rounded-es-xl bg-[#F3F4F6] p-4">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span class="text-md font-semibold capitalize text-customBlack ">
                    {item.receiverName}
                  </span>
                  <span class="text-md  font-normal text-customBlack">
                    {moment(item.createdDate).fromNow()}
                  </span>
                </div>
                <p class="text-md capitaliz py-2.5 font-normal text-customBlack ">
                  <span className="pe-2 font-bold capitalize">
                    {item.receiverName}
                  </span>
                  rejected your friend request
                </p>
              </div>
            </div>
          ))}
          {/* ================= friend request reject notification ==================== */}

          {/* ================= friend request notification ==================== */}
          {FriendReqNotification?.map((item) => (
            <div class="flex items-start gap-2.5">
              <img
                src={item.senderProfilePic}
                alt="profilepic"
                className="h-[80px] w-[80px] rounded-full shadow-lg"
              />
              <div class="leading-1.5  flex  w-full max-w-[90%] flex-col rounded-e-xl rounded-es-xl bg-[#F3F4F6] p-4">
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span class="text-md font-semibold capitalize text-customBlack ">
                    {item.senderName}
                  </span>
                  <span class="text-md  font-normal text-customBlack">
                    {moment(item.createdDate).fromNow()}
                  </span>
                </div>
                <p class="text-md capitaliz py-2.5 font-normal text-customBlack ">
                  <span className="pe-2 font-bold capitalize">
                    {item.senderName}
                  </span>
                  sent you a friend request
                </p>
              </div>
            </div>
          ))}
          {/* ================= friend request notification ==================== */}

        </div>
      </div>
    </>
  );
};

export default NotificationComponent;
