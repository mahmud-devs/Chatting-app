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
    const provider = new GoogleAuthProvider();

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
            signInWithEmailAndPassword(
                auth,
                inputField.email,
                inputField.password
            )
                .then((userCredential) => {
                    // Signed in
                    console.log(userCredential);
                    // ...
                    navigate("/home")
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
            console.log(user);
            if(user){
                navigate("/home")
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // const HandleLoginWithGoogle = () => {
    //     signInWithPopup(auth, provider);
    // };

    // ================== all things return ===============

    return (
        <div className="flex justify-center items-center w-[55%] h-full">
            <div className="w-[45%]">
                <h2 className="text-[33px] font-open font-bold text-textColor mb-[30px]">
                    Login to your account!
                </h2>
                <div
                    className="flex items-center justify-center border-[1.5px] border-opacity-30 border-darkBlue rounded-xl py-[12px] w-3/5 gap-[8px] mb-[30px] cursor-pointer"
                    onClick={HandleLoginWithGoogle}
                >
                    <FcGoogle className="text-[24px]" />
                    <p className="font-open text-darkBlue text-[13px] font-semibold ">
                        Login with Google
                    </p>
                </div>

                {/* ============== form ================ */}

                <form onSubmit={handleSubmit}>
                    {/* ================= email input ================ */}

                    <div className="mb-[60px] font-nunito">
                        <label
                            htmlFor="email"
                            className="text-[13px] font-regular text-darkBlue opacity-70 flex mb-2"
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
                            className=" border-b-2 border-darkBlue border-opacity-30 py-[20px] px-[30px] w-full rounded-md text-[15px] focus:outline-none"
                            onChange={HandleInput}
                        />
                        {inputError.emailError && (
                            <span
                                className="text-[red] inline-block mt-2 ms-2 font-normal "
                                id="emailError"
                            >
                                {inputError.emailError}
                            </span>
                        )}
                    </div>

                    {/* ================= password input ================ */}

                    <div className="font-nunito mb-[55px]">
                        <label
                            htmlFor="email"
                            className="text-[13px] font-regular text-darkBlue opacity-70 flex mb-2"
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
                                className=" border-b-2 border-darkBlue border-opacity-30 py-[20px] px-[30px] w-full rounded-md text-[15px] focus:outline-none"
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
                                className="text-[red] inline-block mt-2 ms-2 font-normal "
                                id="emailError"
                            >
                                {inputError.passwordError}
                            </span>
                        )}
                    </div>

                    {/* ============= submit btn ================ */}
                    <button
                        type="submit"
                        className="bg-btnColor relative text-base py-4 font-nunito rounded-lg text-center w-full text-white"
                        onClick={HandleLigin}
                    >
                        Login to Continue
                        {loading && (
                            <div className="absolute top-[33%]  left-[26%] h-5 w-5 rounded-full bg-transparent animate-spin border-t-white border-b-gray border-[3.5px] border-l-white border-r-gray"></div>
                        )}
                    </button>
                </form>
                <div className=" ">
                    <p className="text-[13px] font-open mt-4 text-[#03014C]">
                        Don’t have an account ?
                        <span>
                            <Link
                                className="text-[#EA6C00] font-semibold hover:underline decoration-solid hover:cursor-pointer"
                                to={"/"}
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
