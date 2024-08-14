import React, { useEffect, useState } from "react";
import Search from "../HomeComponents/HomePageComponents/HomePageCommonComponents/Search";
import SettingRightComponent from "./SettingCommonComponents/SettingRightComponent";

import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, onValue, update, set } from "firebase/database";
import {
  getStorage,
  ref as storageOnRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import moment from "moment";

// =======================================================
import { FaPen } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Uploader } from "uploader";

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
    height: "50%",
  },
};

const SettingComponents = () => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();

  const [UserInfo, setUserInfo] = useState({});
  const [FriendReqReciver, setFriendReqReciver] = useState({});

  // ============= modal state ================
  const [modalIsOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);

    setEditNameInput("");
  }
  function openModal() {
    setIsOpen(true);
  }

  const [EditNameInput, setEditNameInput] = useState("");
  // ========= image uploader ============
  const uploader = Uploader({
    apiKey: "free",
  });

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
  // ============== handle submit function ================
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // ===================== handleInput function implementation ==================

  const handleInput = (e) => {
    setEditNameInput(e.target.value);
  };

  // ========================== handleChangeName function implementation ===================

  const handleChangeName = () => {
    if (!EditNameInput) {
      alert("please enter a name");
    } else {
      updateProfile(auth.currentUser, {
        displayName: EditNameInput,
      })
        .then(() => {
          console.log("update successfull");
          setIsOpen(false);
        })
        .catch((error) => {
          console.log("update failed", error);
        });
      const starCountRef = ref(db, `users/${UserInfo.userKey}`);
      update(starCountRef, {
        username: EditNameInput,
      });
      // ============================
      const FriendNameCountRef = ref(db, `Friends/${FriendReqReciver.userKey}`);
      update(FriendNameCountRef, {
        senderName: EditNameInput,
      });
    }
  };

  // ==========handle image uploaderr ============

  const handleImageUploader = () => {
    uploader
      .open({ multi: false, mimeTypes: ["image/*"] })
      .then((files) => {
        if (files.length === 0) {
          console.log("No files selected.");
        } else {
          // console.log(files[0].originalFile.file);

          // Upload file and metadata to the object 'images/mountains.jpg'
          const storageRef = storageOnRef(
            storage,
            "ProfilePic/" + files[0].originalFile.file.name,
          );
          const uploadTask = uploadBytesResumable(
            storageRef,
            files[0].originalFile.file,
          );

          // ==================================

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
                // ========== user database update ===========
                const starCountRef = ref(db, `users/${UserInfo.userKey}`);
                update(starCountRef, {
                  profile_picture: downloadURL,
                });
                // ========== friend database update ===========
                const FriendReciverCountRef = ref(
                  db,
                  `Friends/${FriendReqReciver.userKey}`,
                );
                update(FriendReciverCountRef, {
                  senderProfilePic: downloadURL,
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
      <div>
        <div>
          <Search />
        </div>
        <div className="mt-8 flex h-[82vh] w-full  justify-between">
          <div className="h-[100%] w-[49%] rounded-2xl bg-gray p-7 shadow-2xl ">
            <h3 className="mb-7 font-popin text-2xl font-semibold">
              Profile Settings
            </h3>
            <div className="flex w-full items-center gap-x-11 border-b-2  border-[#00000051] pb-6">
              <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
                <picture>
                  <img
                    className="h-[100%] w-full rounded-full object-cover"
                    src={UserInfo.profile_picture}
                    alt={UserInfo.profile_picture}
                  />
                </picture>
              </div>
              <div>
                <h3 className="font-popin text-[23px] font-semibold capitalize">
                  {UserInfo.username}
                </h3>
                <p className="font-popin text-lg font-semibold capitalize ">
                  {UserInfo.email}
                </p>
              </div>
            </div>

            <div className="mt-8 h-[200px] w-full px-16">
              <div
                className="mb-8 flex cursor-pointer items-center gap-x-6"
                onClick={openModal}
              >
                <FaPen className="text-2xl" />
                <p className="ps-2 font-popin text-xl  font-normal">
                  Edit Profile Name.
                </p>
              </div>

              <div className="mb-8 flex cursor-pointer items-center gap-x-6">
                <IoChatboxEllipses className="text-2xl" />

                <p className="ps-2 font-popin text-xl  font-normal">
                  Edit Profile Status Info.
                </p>
              </div>

              <div
                className="mb-8 flex cursor-pointer items-center gap-x-6"
                onClick={handleImageUploader}
              >
                <MdAddPhotoAlternate className="text-3xl" />

                <p className="ps-1 font-popin text-xl  font-normal">
                  Edit Profile Photo.
                </p>
              </div>

              <div className="mb-8 flex cursor-pointer items-center gap-x-6">
                <FaRegCircleQuestion className="text-2xl" />

                <p className="ps-2 font-popin text-xl font-normal ">Help.</p>
              </div>
            </div>
          </div>

          {/* ================================================================== */}
          {/* ================================================================== */}
          <SettingRightComponent />
        </div>

        {/* ========================================================= */}

        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            className="rounded-md bg-red px-4 py-2 font-popin text-xl font-semibold capitalize text-white"
            onClick={closeModal}
          >
            close
          </button>

          <h2 className="mb-10 mt-5 text-center font-popin text-3xl font-bold">
            Edit Profile Name
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder=" Edit Profile Name"
              autoComplete="off"
              value={EditNameInput}
              className=" w-full rounded-md border-2 border-darkBlue border-opacity-30 px-[20px] py-[15px] text-[15px] focus:outline-none"
              onChange={handleInput}
            />

            <button
              type="submit"
              onClick={handleChangeName}
              className="relative mt-10 w-full rounded-lg bg-btnColor py-4 text-center font-nunito text-[20px] text-base font-semibold capitalize text-white"
            >
              Change Name
            </button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default SettingComponents;
