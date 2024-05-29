import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// ========= firebase =============
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
const LoginLeft = () => {
  // ========== all states =============
  const [eye, seteye] = useState(false);
  const [inputField, setinputField] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // ========== error states ===============
  const [inputError, setinputError] = useState({
    emailError: "",
    passwordError: "",
  });

  // ============== set Loading state ===============
  const [loading, setloading] = useState(false);

  // =========== firebase auth & google provider ==============

  const auth = getAuth();
  const db = getDatabase();
  const provider = new GoogleAuthProvider();
  provider.addScope("email");
  // ============= handleInput all functionality ==============

  const HandleInput = (e) => {
    setinputField({
      ...inputField,
      [e.target.id]: e.target.value,
    });
  };

  // ============= handle submit ============

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // ============ all regex ===========

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // =============== handle login ==========

  const HandleLigin = () => {
    if (!inputField.email) {
      setinputError({
        ...inputError,
        emailError: "Email missing⚠️",
      });
    } else if (!emailRegex.test(inputField.email)) {
      setinputError({
        ...inputError,
        emailError: "Email credential missing or invalid ⚠️",
      });
    } else if (!inputField.password) {
      setinputError({
        ...inputError,
        emailError: "",
        passwordError: "Password missing⚠️",
      });
    } else if (!passwordRegex.test(inputField.password)) {
      setinputError({
        ...inputError,
        emailError: "",
        passwordError: "Password credential missing or wrong ⚠️",
      });
    } else {
      setinputError({
        ...inputError,
        emailError: "",
        passwordError: "",
      });
      setinputField({
        ...inputField,
        email: "",
        password: "",
      });
      setloading(true);
      signInWithEmailAndPassword(auth, inputField.email, inputField.password)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential);
          // ...
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          setloading(false);
        });
    }
  };

  // =================== HandleGoogleLogin functionality =============

  const HandleLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;

      if (user) {
        
        const { photoUrl, displayName, localId } = user.reloadUserInfo;
        let dbRef = ref(db, "users/");
        set(push(dbRef), {
          username: displayName,
          email: user.reloadUserInfo.providerUserInfo[0].email,
          uid: localId,
          profile_picture: photoUrl,
        })
          .then(() => {
            console.log("data upload done");
          })
          .catch((error) => {
            console.log("gata upload failed", error);
          });
        console.log(user);
        navigate("/")
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const HandleLoginWithGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //       console.log(user)
  //       if(user){
  //           navigate("/")
  //       }

  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

  // ================== all things return ===============

  return (
    <div className="flex h-full w-[55%] items-center justify-center">
      <div className="w-[45%]">
        <h2 className="mb-[30px] font-open text-[33px] font-bold text-textColor">
          Login to your account!
        </h2>
        <div
          className="mb-[30px] flex w-3/5 cursor-pointer items-center justify-center gap-[8px] rounded-xl border-[1.5px] border-darkBlue border-opacity-30 py-[12px]"
          onClick={HandleLoginWithGoogle}
        >
          <FcGoogle className="text-[24px]" />
          <p className="font-open text-[13px] font-semibold text-darkBlue ">
            Login with Google
          </p>
        </div>

        {/* ============== form ================ */}

        <form onSubmit={handleSubmit}>
          {/* ================= email input ================ */}

          <div className="mb-[60px] font-nunito">
            <label
              htmlFor="email"
              className="font-regular mb-2 flex text-[13px] text-darkBlue opacity-70"
            >
              Email Address
            </label>
            <input
              type="text"
              placeholder="Ladushing691@gmail.com"
              id="email"
              name="email"
              value={inputField.email}
              autoComplete="off"
              className=" w-full rounded-md border-b-2 border-darkBlue border-opacity-30 px-[30px] py-[20px] text-[15px] focus:outline-none"
              onChange={HandleInput}
            />
            {inputError.emailError && (
              <span
                className="ms-2 mt-2 inline-block font-normal text-[red] "
                id="emailError"
              >
                {inputError.emailError}
              </span>
            )}
          </div>

          {/* ================= password input ================ */}

          <div className="mb-[55px] font-nunito">
            <label
              htmlFor="email"
              className="font-regular mb-2 flex text-[13px] text-darkBlue opacity-70"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                type={eye ? "text" : "password"}
                placeholder="123456@Mua!"
                id="password"
                name="password"
                value={inputField.password}
                autoComplete="off"
                className=" w-full rounded-md border-b-2 border-darkBlue border-opacity-30 px-[30px] py-[20px] text-[15px] focus:outline-none"
                onChange={HandleInput}
              />

              <div
                className="absolute right-5 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                onClick={() => seteye(!eye)}
              >
                {eye ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {inputError.passwordError && (
              <span
                className="ms-2 mt-2 inline-block font-normal text-[red] "
                id="emailError"
              >
                {inputError.passwordError}
              </span>
            )}
          </div>

          {/* ============= submit btn ================ */}
          <button
            type="submit"
            className="relative w-full rounded-lg bg-btnColor py-4 text-center font-nunito text-base text-white"
            onClick={HandleLigin}
          >
            Login to Continue
            {loading && (
              <div className="bg-transparent absolute  left-[26%] top-[33%] h-5 w-5 animate-spin rounded-full border-[3.5px] border-b-gray border-l-white border-r-gray border-t-white"></div>
            )}
          </button>
        </form>
        <div className=" ">
          <p className="mt-4 font-open text-[13px] text-[#03014C]">
            Don’t have an account ?
            <span>
              <Link
                className="font-semibold text-[#EA6C00] decoration-solid hover:cursor-pointer hover:underline"
                to={"/registration"}
              >
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLeft;
