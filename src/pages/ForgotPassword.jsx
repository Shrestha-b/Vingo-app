import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("")
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")  
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  const navigate = useNavigate(); 

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-2 cursor-pointer">
          <IoIosArrowRoundBack size={30} className={`text-[#e64323]`} onClick={() => navigate('/signin')}/>
          <h1 className={`text-[#e64323]`}>Forgot Password</h1>
        </div>

        {step == 1 &&
        <div className="mb-4 mt-4">
          <label
            className="block text-gray-600 font-medium mb-1"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            id="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus-border-orange-500"
            placeholder="Enter your Email"
            style={{ border: `solid 1px ${borderColor}` }}
            value={email}
          />
          <button
            className={`w-full mt-6 gap-4 font-semibold flex justify-center text-center px-4 py-2 border rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
          >
            Send OTP
          </button>
          </div>
        }

         {step == 2 &&
        <div className="mb-4 mt-4">
          <label
            className="block text-gray-600 font-medium mb-1"
            htmlFor="Enter OTP"
          >
            OTP
          </label>
          <input
            id="Email"
            type="text"
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus-border-orange-500"
            placeholder="Enter OTP"
            style={{ border: `solid 1px ${borderColor}` }}
            value={otp}
          />
          <button
            className={`w-full mt-6 gap-4 font-semibold flex justify-center text-center px-4 py-2 border rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
          >
            Verify    
          </button>
          </div>
          }

            {step == 3 &&
        <div className="mb-4 mt-4">
          <label
            className="block text-gray-600 font-medium mb-1"
            htmlFor="Enter OTP"
          >
            Enter New Password
          </label>
          <input
            id="Email"
            type="text"
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus-border-orange-500"
            placeholder="Enter New Password"
            style={{ border: `solid 1px ${borderColor}` }}
            value={otp}
          />


          <label
            className="block text-gray-600 font-medium mb-1 mt-3"
            htmlFor="Confirm Password"
          >
            Confirm Password
          </label>
          <input
            id="Email"
            type="text"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus-border-orange-500"
            placeholder="Enter OTP"
            style={{ border: `solid 1px ${borderColor}` }}
            value={otp}
          />


          <button
            className={`w-full mt-6 gap-4 font-semibold flex justify-center text-center px-4 py-2 border rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
          >
            Reset Password
          </button>
          </div>
          }




      </div>
    </div>
  );
}

export default ForgotPassword;
