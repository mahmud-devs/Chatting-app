import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getAuth } from "firebase/auth";
import moment from "moment";

import ProfileImage3 from "../../../../assets/HomePageImage/three.gif";
// =========== react modal ===================
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
  },
};
// =========== react modal ===================

import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";

const MyGroupList = () => {
  // ============= all states ===================
  const [myGroup, setmyGroup] = useState([]);
  const [joinGroupReq, setjoinGroupReq] = useState([]);
  const [joinGroupReqUser, setjoinGroupReqUser] = useState([]);
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
          myGroupArr.push({ ...item.val(), GroupKey: item.key });
        }
      });
      setmyGroup(myGroupArr);
    });
  }, [db]);
  // console.log(myGroup);

  // =========== react modal function ===================
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal(groupKey) {
    setIsOpen(true);

    const starCountRef = ref(db, "joinGroupRequest/");
    onValue(starCountRef, (snapshot) => {
      let joinGroupReqUserArr = [];

      snapshot.forEach((item) => {
        if (item.val().GroupKey === groupKey) {
          joinGroupReqUserArr.push({ ...item.val(), GroupReqKey: item.key });
        }
      });

      setjoinGroupReqUser(joinGroupReqUserArr);
    });
  }
  // console.log(joinGroupReqUser);
  function closeModal() {
    setIsOpen(false);
  }
  // ================== join group request data read ====================
  useEffect(() => {
    const starCountRef = ref(db, "joinGroupRequest/");
    onValue(starCountRef, (snapshot) => {
      let joinGroupReqArr = [];

      snapshot.forEach((item) => {
        joinGroupReqArr.push(item.val().GroupKey + item.val().AdminUid);
      });
      setjoinGroupReq(joinGroupReqArr);
    });
  }, [db]);
  // console.log(joinGroupReqUser);

  // ================ join group request accept =================
  const handleGroupRequestAccept = (item) => {
    // console.log(item);
    let dbAcceptGroupReq = ref(db, "GroupMembers/");
    set(push(dbAcceptGroupReq), {
      AdminEmail: item.AdminEmail,
      AdminUid: item.AdminUid,
      AdminUserName: item.AdminUserName,
      GroupKey: item.GroupKey,
      GroupName: item.GroupName,
      GroupPhotoUrl: item.GroupPhotoUrl,
      GroupTagName: item.GroupTagName,
      GroupMemberName: item.whoWantsToJoinName,
      GroupMemberUid: item.whoWantsToJoinUid,
      GroupMemberPhoto: item.whoWantsToJoinPhoto,

      createdDate: moment().format("MM//DD/YYYY, h:mm:ss a"),
    })
      .then(() => {
        let dbAcceptGroupReqNotification = ref(db, "AllNotification/");
        set(push(dbAcceptGroupReqNotification), {
          NotificationName: item.GroupName,
          NotificationProfilePic: item.GroupPhotoUrl,
          NotificationReceiverUid: item.whoWantsToJoinUid,
          NotificationMessege: `${item.GroupName} Accepted your group join request!`,

          createdDate: moment().format("MM//DD/YYYY, h:mm:ss a"),
        });
      })
      .then(() => {
        const acceptGroupReqdbRef = ref(
          db,
          `joinGroupRequest/${item.GroupReqKey}`,
        );
        remove(acceptGroupReqdbRef);
      });
  };

  // ================ join group request reject =================

  const handleGroupRequestReject = (item) => {
    // console.log(item);
    const acceptGroupReqdbRef = ref(db, `joinGroupRequest/${item.GroupReqKey}`);
    remove(acceptGroupReqdbRef);
    // ================== send data ====================
    let dbRejectGroupReqNotification = ref(db, "AllNotification/");
    set(push(dbRejectGroupReqNotification), {
      NotificationName: item.GroupName,
      NotificationProfilePic: item.GroupPhotoUrl,
      NotificationReceiverUid: item.whoWantsToJoinUid,
      NotificationMessege: `${item.GroupName} Rejected your group join request!`,

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
              My Group List
              <div class="absolute  -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red text-xs font-bold text-white">
                {myGroup.length}
              </div>
            </button>
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

                <div className="w-[40%]">
                  <h4 className="font-popin text-[18px] font-semibold text-customBlack">
                    {item.GroupName ? item.GroupName : "Default"}
                  </h4>
                  <p className="text-wrap font-popin text-[14px] text-ptext opacity-75">
                    {item.GroupTagName ? item.GroupTagName : "messege deleted"}
                  </p>
                </div>
                {joinGroupReq.includes(item.GroupKey + auth.currentUser.uid) ? (
                  <button
                    className="w-[29%] rounded-md bg-btnColor px-[5px] py-[5px] font-popin text-[14px] font-semibold capitalize text-white"
                    onClick={() => openModal(item.GroupKey)}
                  >
                    See Requests
                  </button>
                ) : (
                  <p className="w-[29%] text-center font-popin text-[12px] font-medium opacity-50">
                    {item.createdDate
                      ? moment(item.createdDate).calendar()
                      : "Error time"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            className="mb-5 rounded-md bg-red px-2 py-1 font-nunito font-semibold text-white "
            onClick={closeModal}
          >
            Exit
          </button>
          <div className="divide-y divide-ptext overflow-y-scroll pe-6 scrollbar-thin">
            {joinGroupReqUser?.map((item) => (
              <div>
                {/* ============================= */}
                <div className="flex flex-col items-center justify-center pb-5 pt-4">
                  <div className="h-[70px] w-[70px] cursor-pointer">
                    <picture>
                      <img
                        className="size-full w-full rounded-full object-cover shadow-lg "
                        src={item.whoWantsToJoinPhoto}
                        alt={item.whoWantsToJoinPhoto}
                      />
                    </picture>
                  </div>
                  <h3 className="mt-2 font-nunito text-[18px] font-semibold capitalize">
                    {`${item.whoWantsToJoinName} Wants to join ${item.GroupName}`}
                  </h3>
                </div>

                {/* ============================= */}

                <div className="flex items-center  justify-between py-[13px] ">
                  <div className="h-[70px] w-[70px] cursor-pointer">
                    <picture>
                      <img
                        className="size-full w-full rounded-full object-cover shadow-lg "
                        src={item.GroupPhotoUrl}
                        alt={item.GroupPhotoUrl}
                      />
                    </picture>
                  </div>

                  <div className="w-[44%]">
                    <h4 className="font-popin text-[18px] font-semibold text-customBlack">
                      {item.GroupName ? item.GroupName : "user"}
                    </h4>
                    <p className="text-wrap font-popin text-[14px] text-ptext opacity-75">
                      {moment(item.createdDate).fromNow()}
                    </p>
                  </div>

                  <div className="flex gap-x-4">
                    <button
                      onClick={() => handleGroupRequestAccept(item)}
                      className="rounded-lg bg-btnColor px-[10px] py-[5px] font-popin text-[16px] font-semibold text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleGroupRequestReject(item)}
                      className="rounded-lg bg-red px-[10px] py-[5px] font-popin text-[16px] font-semibold text-white"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MyGroupList;
