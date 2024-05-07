import React from "react";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "../../assets/EmailVerificationPage/EmailIcon.gif";

const EmailVerification = ({email}) => {
    return (
        <>
            <div className="w-[100%] h-full bg-btnColor flex justify-center items-center">
                <div className="w-1/2 h-3/4 bg-white rounded-xl shadow-2xl opacity-95 flex flex-col justify-center items-center px-20">
                    <div className="w-[200px]">
                        <img src={EmailIcon} alt="" />
                    </div>
                    <h3 className="font-open font-semibold capitalize text-[30px]">
                        Verify your email address{" "}
                    </h3>
                    <p className="text-center mt-4 font-nunito font-normal text-[18px] mb-9">
                        You've entered{" "}
                        <span className="font-open font-bold">{email ? email :""} </span> as the
                        email address for your account. Please verify this email
                        address by clicking button below.
                    </p>
                    <button>
                        <Link
                            className="py-4 px-6 text-white rounded-xl font-open font-medium bg-btnColor"
                            to={
                                "https://mail.google.com/mail/"
                            }
                            target="_blank"
                        >
                            Verify your email
                        </Link>
                    </button>
                </div>
            </div>
        </>
    );
};

export default EmailVerification;
