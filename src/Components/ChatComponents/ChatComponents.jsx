import React, { useEffect, useState } from "react";
import GroupList from "../HomeComponents/HomePageComponents/GroupList/GroupList";
import FriendList from "../HomeComponents/HomePageComponents/FriendList/FriendList";
import profilePic from "../../assets/homeLeft/profile.png";
import { FaPaperPlane } from "react-icons/fa";
import { FaRegFaceLaugh } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";

import EmojiPicker from "emoji-picker-react";

import ScrollToBottom from "react-scroll-to-bottom";

// ==================== firebase import ===================
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import {
  getStorage,
  ref as storageMainRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { Uploader } from "uploader";

import { useSelector } from "react-redux";

import { BsThreeDotsVertical } from "react-icons/bs";
const ChatComponents = () => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();
  const [ChatMsg, setChatMsg] = useState("");
  const [SingleMsgData, setSingleMsgData] = useState([]);
  const [SingleMsgDataUid, setSingleMsgDataUid] = useState([]);
  const { friendsDataRedux } = useSelector((state) => state.FriendData);
  const [openEmoji, setopenEmoji] = useState(false);
  // console.log(friendsDataRedux);

  // =====================handleChatMsg function implementation========================

  const handleChatMsg = (event = {}) => {
    const { value } = event.target;

    setChatMsg(value);
  };
  // ====================== handleSendMsg function implementation =================

  const handleSendMsg = () => {
    let dbSingleMsgFef = ref(db, "SingleMsg/");
    set(push(dbSingleMsgFef), {
      whoSendMsgName: auth.currentUser.displayName,
      whoSendMsgEmail: auth.currentUser.email,
      whoSendMsgPhoto: friendsDataRedux.receiverProfilePic,
      whoSendMsgUid: auth.currentUser.uid,
      whoRecivedMsgName: friendsDataRedux.senderName,
      whoRecivedMsgEmail: friendsDataRedux.senderEmail,
      whoRecivedMsgUid: friendsDataRedux.senderUid,
      whoRecivedMsgPhoto: friendsDataRedux.senderProfilePic,
      SingleMsg: ChatMsg,
      createdDate: moment().format("MM//DD/YYYY, h:mm:ss a"),
    }).then(() => {
      setChatMsg("");
      setopenEmoji(false);
    });
  };

  // ==============================  read data from single messege database  ========================

  useEffect(() => {
    const SingleMsgdbRef = ref(db, "SingleMsg/");
    onValue(SingleMsgdbRef, (snapshot) => {
      let SingleMsgArr = [];
      let SingleMsgUidArr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid === item.val().whoSendMsgUid ||
          auth.currentUser.uid === item.val().whoRecivedMsgUid
        ) {
          SingleMsgArr.push({ ...item.val(), SilgleMsgKey: item.key });
        }
      });
      snapshot.forEach((item) => {
        SingleMsgUidArr.push(
          item.val().whoRecivedMsgUid + item.val().whoSendMsgUid,
        );
      });

      setSingleMsgData(SingleMsgArr);
      setSingleMsgDataUid(SingleMsgUidArr);
    });
  }, [db]);

  // const AllDataUid = friendsDataRedux.senderUid + auth.currentUser.uid;
  // console.log(AllDataUid);
  // console.log(SingleMsgDataUid);
  // console.log(friendsDataRedux.receiverUid);

  // ================================== handleEmoji =============================

  const handleEmoji = (EmojiClickData) => {
    // console.log(EmojiClickData.emoji);
    setChatMsg((prevMsg) => {
      // console.log(prevMsg);
      return `${prevMsg} ${EmojiClickData.emoji}`;
    });
  };

  // ============================= handleSendImg function implementation============================
  // ========= image uploader ============
  const uploader = Uploader({
    apiKey: "free",
  });

  const handleSendImg = () => {
    uploader
      .open({ multi: true })
      .then((files) => {
        if (files.length === 0) {
          console.log("No files selected.");
        } else {
          // Upload file and metadata to the object 'images/mountains.jpg'
          const storageRef = storageMainRef(
            storage,
            "ChatMessege/" + files[0].originalFile.file.name,
          );
          const uploadTask = uploadBytesResumable(
            storageRef,
            files[0].originalFile.file,
          );
          // ========================= =======================
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.log(error.code);
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // console.log("File available at", downloadURL);
                let dbSingleMsgFef = ref(db, "SingleMsg/");
                set(push(dbSingleMsgFef), {
                  whoSendMsgName: auth.currentUser.displayName,
                  whoSendMsgEmail: auth.currentUser.email,
                  whoSendMsgPhoto: friendsDataRedux.receiverProfilePic,
                  whoSendMsgUid: auth.currentUser.uid,
                  whoRecivedMsgName: friendsDataRedux.senderName,
                  whoRecivedMsgEmail: friendsDataRedux.senderEmail,
                  whoRecivedMsgUid: friendsDataRedux.senderUid,
                  whoRecivedMsgPhoto: friendsDataRedux.senderProfilePic,
                  SingleMsgImage: downloadURL,
                  createdDate: moment().format("MM//DD/YYYY, h:mm:ss a"),
                });
              });
            },
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="flex justify-between">
        <div className=" w-[32%] ">
          <GroupList isChat={true} />
          <FriendList isChat={true} />
        </div>
        <div className="h-[94vh] w-[67%] ps-7  ">
          <div className="h-[100%] w-full rounded-2xl  pt-5 shadow-xl">
            {/* ============================================ */}
            <div className="px-10">
              <div className="mb-7 flex w-full items-center  justify-between border-b-2 border-[rgba(0,0,0,0.3)] pb-5">
                <div className="flex items-center gap-x-10 ">
                  <div className="relative h-[70px] w-[70px] cursor-pointer">
                    <picture>
                      <img
                        className="size-full w-full rounded-full object-cover shadow-lg "
                        src={
                          friendsDataRedux.senderProfilePic
                            ? friendsDataRedux.senderProfilePic
                            : profilePic
                        }
                        alt={
                          friendsDataRedux.senderProfilePic
                            ? friendsDataRedux.senderProfilePic
                            : profilePic
                        }
                      />
                    </picture>
                    {navigator.onLine && (
                      <span class="absolute bottom-1 right-1 flex h-3 w-3">
                        <span class="absolute inline-flex h-[100%] w-full animate-ping rounded-full bg-green opacity-75"></span>
                        <span class="relative inline-flex h-3 w-3 rounded-full bg-green"></span>
                      </span>
                    )}
                  </div>
                  {/* ==================== */}
                  <div>
                    <h4 className="font-popin text-[18px] font-semibold capitalize text-customBlack">
                      {friendsDataRedux.senderName
                        ? friendsDataRedux.senderName
                        : "User Name"}
                    </h4>
                    <p className="text-wrap font-popin text-[14px] text-ptext opacity-75">
                      Online
                    </p>
                  </div>
                </div>

                <button>
                  <BsThreeDotsVertical className=" text-[25px] text-btnColor" />
                </button>
              </div>
            </div>
            {/* ======================================================== */}

            <ScrollToBottom className="h-[65%]">
              <div className=" h-[100%] w-full  overflow-y-scroll px-10  scrollbar-thin ">
                {SingleMsgData?.map((item) => (
                  <div className="flex w-full flex-col">
                    {item.whoSendMsgUid === auth.currentUser.uid &&
                    item.whoRecivedMsgUid === friendsDataRedux.senderUid ? (
                      <div className="mb-5  self-end  ">
                        <div className=" mb-2 max-w-[350px] self-end font-popin">
                          {item.SingleMsg ? (
                            <p className="messRight relative w-fit rounded-xl bg-btnColor px-7 py-3 text-[18px] font-semibold  text-white ">
                              {item.SingleMsg}
                            </p>
                          ) : (
                            <picture>
                              <img
                                className="w-fit"
                                src={item.SingleMsgImage}
                                alt={item.SingleMsgImage}
                              />
                            </picture>
                          )}
                        </div>
                        <span className="inline-block w-full text-end">
                          {moment(item.createdDate).calendar()}
                        </span>
                      </div>
                    ) : (
                      item.whoRecivedMsgUid === auth.currentUser.uid &&
                      item.whoSendMsgUid === friendsDataRedux.senderUid && (
                        <div>
                          <div className="mb-5 self-start">
                            <div className=" mb-2 max-w-[350px] font-popin ">
                              {item.SingleMsg ? (
                                <p className="messLeft relative w-fit rounded-xl bg-[#F1F1F1] px-7 py-3 text-[18px]  font-semibold ">
                                  {item.SingleMsg}
                                </p>
                              ) : (
                                <picture>
                                  <img
                                    className="w-fit"
                                    src={item.SingleMsgImage}
                                    alt={item.SingleMsgImage}
                                  />
                                </picture>
                              )}
                            </div>
                            <span>{moment(item.createdDate).calendar()}</span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </ScrollToBottom>

            {/* ====================================================================== */}
            <div className="w-full  px-10 ">
              <div className="w-full  border-t-2 border-[rgba(0,0,0,0.4)] pt-7">
                <div className="flex  w-full justify-between">
                  <div className="relative w-[88%]">
                    <input
                      type="text"
                      className="w-full rounded-xl bg-[#F1F1F1] px-8 py-3 pe-28"
                      onChange={handleChatMsg}
                      value={ChatMsg}
                    />
                    {openEmoji && (
                      <div className="absolute bottom-[80px] right-0">
                        <EmojiPicker onEmojiClick={handleEmoji} />
                      </div>
                    )}
                    {/* ====================== send emoji ========================= */}
                    <span
                      className="absolute right-[10%] top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setopenEmoji(!openEmoji)}
                    >
                      <FaRegFaceLaugh className=" text-xl" />
                    </span>
                    {/* ================ send image =========================== */}
                    <span
                      onClick={handleSendImg}
                      className="absolute right-[4%] top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <IoCameraOutline className=" text-2xl" />
                    </span>
                  </div>
                  {/* ================ send messege =========================== */}
                  <button
                    onClick={handleSendMsg}
                    className="flex w-[55px] cursor-pointer items-center justify-center rounded-xl bg-btnColor py-3"
                  >
                    <FaPaperPlane className="text-xl text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponents;
