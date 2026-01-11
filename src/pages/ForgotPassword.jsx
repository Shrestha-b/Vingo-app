import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [err, setErr] = useState("");
  const borderColor = "#ddd";

  const handleSendOpt = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result.data);
      setStep(2);
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { otp, email },
        { withCredentials: true }
      );
      console.log(result);
      setStep(3);
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return null;
    }
    setLoading(true);
    setLoading(false);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { newPassword, email },
        { withCredentials: true }
      );
      console.log(result);
      navigate("/signin");
      setErr("");
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-2 cursor-pointer">
          <IoIosArrowRoundBack
            size={20}
            className={`text-[#e64323]`}
            onClick={() => navigate("/signin")}
          />
          <h1 className={`text-[#e64323]`}>Forgot Password</h1>
        </div>

        {step == 1 && (
          <div className="mb-4 mt-4">
            <label
              className="block text-gray-600 font-medium mb-1"
              htmlFor="Email"
            >
              Email
            </label>
            <input
              required
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
              onClick={handleSendOpt}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader
                  color={color}
                  loading={loading}
                  size={20}
                  // aria-label="Loading Spinner"
                  // data-testid="loader"
                />
              ) : (
                "Send OTP"
              )}
            </button>
            {err && (
              <p className="text-red-500 text-center my-[10px]">*{err}</p>
            )}
          </div>
        )}

        {step == 2 && (
          <div className="mb-4 mt-4">
            <label
              className="block text-gray-600 font-medium mb-1"
              htmlFor="Enter OTP"
            >
              OTP
            </label>
            <input
              required
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
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader
                  color={color}
                  loading={loading}
                  size={20}
                />
              ) : (
                "Verify"
              )}
            </button>
            {err && (
              <p className="text-red-500 text-center my-[10px]">*{err}</p>
            )}
          </div>
        )}

        {step == 3 && (
          <div className="mb-4 mt-4">
            <label
              className="block text-gray-600 font-medium mb-1"
              htmlFor="Enter OTP"
            >
              Enter New Password
            </label>
            <input
              required
              id="Email"
              type="text"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus-border-orange-500"
              placeholder="Enter New Password"
              style={{ border: `solid 1px ${borderColor}` }}
              value={newPassword}
            />

            <label
              className="block text-gray-600 font-medium mb-1 mt-3"
              htmlFor="Confirm Password"
            >
              Confirm Password
            </label>
            <input
              required
              id="Email"
              type="text"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus-border-orange-500"
              placeholder="Enter OTP"
              style={{ border: `solid 1px ${borderColor}` }}
              value={confirmPassword}
            />

            <button
              className={`w-full mt-6 gap-4 font-semibold flex justify-center text-center px-4 py-2 border rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader
                  color={color}
                  loading={loading}
                  size={20}
                  // aria-label="Loading Spinner"
                  // data-testid="loader"
                />
              ) : (
                "Reset Password"
              )}
            </button>
            {err && (
              <p className="text-red-500 text-center my-[10px]">*{err}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
