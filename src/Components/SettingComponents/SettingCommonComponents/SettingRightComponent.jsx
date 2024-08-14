import React, { useEffect, useState } from "react";

import { FaKey } from "react-icons/fa";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { getAuth, deleteUser } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  update,
  remove,
  set,
} from "firebase/database";

const SettingRightComponent = () => {
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const [UserInfo, setUserInfo] = useState({});
  const [FriendReqReciver, setFriendReqReciver] = useState({});

  //   ================= read data from user database ===================

  useEffect(() => {
    const UserdbRef = ref(db, "users/");
    onValue(UserdbRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().uid) {
          setUserInfo({ ...item.val(), userKey: item.key });
        }
      });
    });
  }, [db]);
  // console.log(UserInfo);

  //   ================= read data from Friend database ===================
  useEffect(() => {
    const FriendReqRecivedbRef = ref(db, "Friends/");
    onValue(FriendReqRecivedbRef, (snapshot) => {
      snapshot.forEach((item) => {
        // console.log(item.val());
        if (auth.currentUser.uid === item.val().senderUid) {
          setFriendReqReciver({ ...item.val(), userKey: item.key });
        }
      });
    });
  }, [db]);
  // console.log(FriendReqReciver);

  // ====================handleDeleteUser function implementation =================

  const handleDeleteUser = () => {
    const starCountRef = ref(db, `users/${UserInfo.userKey}`);
    remove(starCountRef);
    // ============================
    const FriendNameCountRef = ref(db, `Friends/${FriendReqReciver.userKey}`);
    remove(FriendNameCountRef);

    // ==========================
    deleteUser(currentUser)
      .then(() => {
        console.log("user deleted");
        navigate("/registration");
      })
      .catch((error) => {
        // console.log("user not deleted", error);
      });
  };

  return (
    <>
      <div className="h-[100%] w-[49%] rounded-2xl bg-gray p-7 shadow-2xl ">
        <h3 className="mb-7 font-popin text-2xl font-semibold">
          Account Settings
        </h3>

        <div className="mt-8 h-[200px] w-full px-16">
          <div
            className="mb-8 flex cursor-pointer items-center gap-x-6"
            // onClick={openModal}
          >
            <FaKey className="text-2xl" />
            <p className="ps-2 font-popin text-xl  font-normal">
              Change Password
            </p>
          </div>

          <div className="mb-8 flex cursor-pointer items-center gap-x-6">
            <FaCircleHalfStroke className="text-2xl" />

            <p className="ps-2 font-popin text-xl  font-normal">Theme.</p>
          </div>

          <div
            className="mb-8 flex cursor-pointer items-center gap-x-6"
            onClick={handleDeleteUser}
          >
            <FaTrashAlt className="text-2xl" />

            <p className="ps-2 font-popin text-xl font-normal ">
              Delete Account.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingRightComponent;
