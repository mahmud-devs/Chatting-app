import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

import registrationImg from "../../src/assets/registration.png";

const Registration = () => {
    const [Email, setEmail] = useState("");
    const [FullName, setFullName] = useState("");
    const [Password, setPassword] = useState("");
    const [eye, seteye] = useState("false");

    // ============= all error hook state
    const [EmailError, setEmailError] = useState("");
    const [FullNameError, setFullNameError] = useState("");
    const [PasswordError, setPasswordError] = useState("");

    // ============ all regex ===========

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // =================handle eye functionlallity ===========

    const handleEye = () => {
        seteye(!eye);
    };

    // =================handle signup functionality ===========

    





    const handleSignup = () => {
        if (!Email) {
            setEmailError("Email missing⚠️");
        } else if (!emailRegex.test(Email)){
            setEmailError("Email credential missing or invalid ⚠️");
        }
        else if (!FullName) {
            setEmailError("");
            setFullNameError("")
            setPasswordError("");
            setFullNameError("Full Name missing⚠️");
        } else if (!Password) {
            setEmailError("");
            setFullNameError("")
            setPasswordError("");
            setPasswordError("Password missing⚠️");
        } else if(!passwordRegex.test(Password)){
            setPasswordError("Password credential missing or invalid ⚠️");
            setFullNameError("")
        } 
        else {
            setEmailError("");
            setFullNameError("")
            setPasswordError("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <div className="flex justify-center">
                <div className=" w-[100%] bg-red-400 h-full flex justify-evenly items-center">
                    <div className="w-1/3">
                        <h1 className="text-darkBlue font-bold text-[34px] mb-[13px] font-nunito">
                            Get started with easily register
                        </h1>
                        <p className="text-[20px] font-normal opacity-50 mb-12 font-nunito">
                            Free register and you can enjoy it
                        </p>
                        <form className="w-3/4" onSubmit={handleSubmit}>
                            {/* ========== email ========== */}

                            <div className="mb-10 font-nunito">
                                <label
                                    htmlFor="email"
                                    className="text-[13px] font-semibold text-darkBlue opacity-70 flex mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ladushing691@gmail.com"
                                    id="email"
                                    name="email"
                                    autoComplete="off"
                                    className=" border-2 border-darkBlue border-opacity-30 py-[20px] px-[30px] w-full rounded-lg text-[15px]"
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />
                                {EmailError && (
                                    <span className="text-[red] inline-block mt-2 ms-2 font-normal ">
                                        {EmailError}
                                    </span>
                                )}
                            </div>

                            {/* ========= full name ============= */}

                            <div className="mb-10 ">
                                <label
                                    htmlFor="fullName"
                                    className="text-[13px] font-semibold text-darkBlue opacity-70 flex mb-2 font-nunito"
                                >
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ladushing GTG"
                                    id="fullName"
                                    name="fullName"
                                    autoComplete="off"
                                    className=" border-2 border-darkBlue border-opacity-30 py-[20px] px-[30px] w-full rounded-lg text-[15px]"
                                    onChange={(event) =>
                                        setFullName(event.target.value)
                                    }
                                />
                                {FullNameError && (
                                    <span className="text-[red] inline-block mt-2 ms-2 font-normal ">
                                        {FullNameError}
                                    </span>
                                )}
                            </div>

                            {/* ========= password ============= */}

                            <div className="mb-10 ">
                                <label
                                    htmlFor="password"
                                    className="text-[13px] font-semibold text-darkBlue opacity-70 flex mb-2 font-nunito"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={eye ? "password" : "text"}
                                        placeholder="000000000"
                                        id="password"
                                        name="password"
                                        autoComplete="off"
                                        className=" border-2 border-darkBlue border-opacity-30 py-[20px] px-[30px] w-full rounded-lg text-[15px]"
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                    />
                                    <div
                                        className="absolute right-5 top-1/2 -translate-y-1/2 hover:cursor-pointer"
                                        onClick={handleEye}
                                    >
                                        {eye ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                                {PasswordError && (
                                    <span className="text-[red] inline-block mt-2 ms-2 font-normal ">
                                        {PasswordError}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="bg-btnColor text-base py-4 font-nunito rounded-full text-center w-full text-white"
                                onClick={handleSignup}
                            >
                                Sign up
                            </button>
                        </form>
                        <div className="w-3/4 text-center">
                            <p className="text-[13px] font-open mt-4 text-[#03014C]">
                                Already have an account ?{" "}
                                <span className="text-[#EA6C00] font-semibold hover:underline decoration-solid hover:cursor-pointer">
                                    Sign In
                                </span>{" "}
                            </p>
                        </div>
                    </div>
                    <div className="w-1/3 h-full">
                        <img
                            className="h-[100%]"
                            src={registrationImg}
                            alt={registrationImg}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;
