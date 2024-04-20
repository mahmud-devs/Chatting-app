import React from "react";
import registrationImg from "../../src/assets/registration.png";

const Registration = () => {
    const handleSubmit = (event)=>{
        event.preventDefault()
    }
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
                                />
                            </div>

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
                                />
                            </div>

                            <div className="mb-10 ">
                                <label
                                    htmlFor="password"
                                    className="text-[13px] font-semibold text-darkBlue opacity-70 flex mb-2 font-nunito"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="000000000"
                                    id="password"
                                    name="password"
                                    autoComplete="off"
                                    className=" border-2 border-darkBlue border-opacity-30 py-[20px] px-[30px] w-full rounded-lg text-[15px]"
                                />
                            </div>

                            <button type="submit" className="bg-btnColor text-base py-4 font-nunito rounded-full text-center w-full text-white">Sign up</button>
                        </form>
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
