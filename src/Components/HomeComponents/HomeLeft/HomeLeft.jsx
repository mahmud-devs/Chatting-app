import React, { useEffect, useState } from "react";
import porfilePic from "../../../assets/homeLeft/profile.png";
import { IoHomeOutline } from "react-icons/io5";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";
import { BsGear } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCloudArrowUp } from "react-icons/fa6";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, update, set } from "firebase/database";
import { FaUserAlt } from "react-icons/fa";

import { ToastContainer, toast, Bounce } from "react-toastify";

import { Uploader } from "uploader";

const HomeLeft = () => {
  const db = getDatabase();
  const auth = getAuth();
  const location = useLocation();
  const navigate = useNavigate();
  let active = location.pathname.split("/")[1];

  // ========== all states ==========

  const [photoUrl, setphotoUrl] = useState("");

  const [userInfo, setuserInfo] = useState([]);

  // ========= image uploader ============
  const uploader = Uploader({
    apiKey: "free",
  });

  // =========== user id information from database ========

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        const starCountRef = ref(db, "/users");
        onValue(starCountRef, (snapshot) => {
          snapshot.forEach((item) => {
            if (item.val().uid === uid) {
              setuserInfo(Object.assign(item.val(), { userKey: item.key }));
            }
            // console.log(item.val());
          });
        });
      }
    });
  }, [db]);

  // ==========handle image uploaderr ============

  const handleImageUploader = () => {
    uploader
      .open({ multi: false, mimeTypes: ["image/*"] })
      .then((files) => {
        if (files.length === 0) {
          console.log("No files selected.");
        } else {
          // console.log(files);
          setphotoUrl(files[0].fileUrl);
          // set(ref(db, "users/" + userInfo[0].userKey), {
          //   username: userInfo[0].username,
          //   email: userInfo[0].email,
          //   uid: userInfo[0].uid,
          //   profile_picture: files[0].fileUrl,
          // });
          const starCountRef = ref(db, `users/${userInfo.userKey}`);
          update(starCountRef, {
            profile_picture: files[0].fileUrl,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // =============== handleSignOut function implementation ==================

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successfully");
        toast.success("📤 Successfully Sign Out!", {
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
        navigate("/login");
      })
      .catch((error) => {
        // An error happened
        console.log("error while signing out", error);
      });
  };

  return (
    <>
      <div className="flex h-[100%] w-[10%] flex-col  items-center rounded-3xl  bg-btnColor py-9">
        <div
          className="relative h-[100px] w-[100px] rounded-full bg-customBlack "
          onClick={handleImageUploader}
        >
          {userInfo.profile_picture ? (
            <picture>
              <img
                className="h-[100%] w-[100%] rounded-full object-cover"
                src={userInfo ? userInfo.profile_picture : porfilePic}
                alt={porfilePic}
              />
            </picture>
          ) : (
            <picture>
              <img
                className="h-[100%] w-[100%] rounded-full object-cover"
                src={porfilePic}
                alt={porfilePic}
              />
            </picture>
          )}

          {/* <FaUserAlt className="absolute left-[50%] top-[50%] text-white z-10"/> */}

          <div className="absolute left-0 top-0 flex h-[100%] w-[100%] cursor-pointer items-center justify-center rounded-full border-[4px] border-white bg-[#000000a3]  opacity-0 transition-all duration-300 hover:opacity-100">
            <FaCloudArrowUp className="text-[30px] text-white" />
          </div>
        </div>

        <h2 className="mt-2 font-popin text-[20px] font-semibold capitalize text-white">
          {userInfo.username && userInfo.username.split(" ")[0].slice(0, 8)}...
        </h2>

        <ul className="mt-4 flex flex-col items-center gap-3 ps-5  text-[35px] text-white">
          <li
            className={
              active === ""
                ? "relative cursor-pointer rounded-s-2xl bg-white  pb-2 pl-[35px] pr-[56px] pt-3 text-btnColor after:absolute after:right-0 after:top-0 after:h-[100%] after:w-3 after:rounded-s-full after:bg-btnColor"
                : "cursor-pointer pb-2 pr-[26px] pt-3 opacity-80 "
            }
          >
            <Link>
              <IoHomeOutline />
            </Link>
          </li>
          <li
            className={
              active === "chat"
                ? " relative cursor-pointer rounded-s-2xl bg-white pb-2 pl-[35px] pr-[56px] pt-3 text-btnColor after:absolute after:right-0 after:top-0 after:h-[100%] after:w-3 after:rounded-s-full after:bg-btnColor"
                : "cursor-pointer pb-2 pr-[26px] pt-3 opacity-80 "
            }
          >
            <Link to={"/chat"}>
              <IoChatbubbleEllipsesOutline />
            </Link>
          </li>
          <li
            className={
              active === "notification"
                ? " relative cursor-pointer rounded-s-2xl bg-white pb-2 pl-[35px] pr-[56px] pt-3 text-btnColor after:absolute after:right-0 after:top-0 after:h-[100%] after:w-3 after:rounded-s-full after:bg-btnColor"
                : "cursor-pointer pb-2 pr-[26px] pt-3 opacity-80 "
            }
          >
            <Link to={"/notification"}>
              <FaRegBell />
            </Link>
          </li>
          <li
            className={
              active === "setting"
                ? "relative cursor-pointer rounded-s-2xl bg-white pb-2 pl-[35px] pr-[56px] pt-3 text-btnColor after:absolute after:right-0 after:top-0 after:h-[100%] after:w-3 after:rounded-s-full after:bg-btnColor"
                : "cursor-pointer pb-2 pr-[26px] pt-3 opacity-80"
            }
          >
            <Link to={"/setting"}>
              <BsGear />
            </Link>
          </li>
          <li
            onClick={handleSignOut}
            className="mt-10 cursor-pointer pb-2 pr-[26px] pt-3 text-white opacity-100"
          >
            <LuLogOut />
          </li>
        </ul>
      </div>
    </>
  );
};

export default HomeLeft;
