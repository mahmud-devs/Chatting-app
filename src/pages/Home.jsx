import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import EmailVerification from "../Components/HomeComponents/EmailVerification";
import HomeLeft from "../Components/HomeComponents/HomeLeft/HomeLeft";
import HomeRight from "../Components/HomeComponents/HomeRight/HomeRight";

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userInfo, setuserInfo] = useState({
    email: "",
    displayName: "",
    emailVerified: "",
  });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      // if (user.emailVerified == false) {
      //     navigate("/email-verification");
      // }
      setuserInfo({
        ...userInfo,
        email: user.email,
        emailVerified: user.emailVerified,
      });
    });
  }, [userInfo.emailVerified]);
  return (
    <>
      <div>
        <div>
          {userInfo.emailVerified ? (
            <div className="flex h-full gap-9 p-5">
              <HomeLeft />
              <HomeRight />
            </div>
          ) : (
            <EmailVerification email={userInfo.email} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
