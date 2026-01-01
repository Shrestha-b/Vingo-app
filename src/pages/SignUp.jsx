import axios from "axios";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";

export default function SignUp() {

  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(true);
  const [role, setRole] = useState("user");
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();    

const handleSignUp = async () => {
    try{
        const result = await axios.post(`${serverUrl}/api/auth/signup`,{
            fullName,email,mobile,password, role
        },{withCredentials:true})
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",result)
    }catch (error){
        console.log(error.response.data.message)
    }
}

  return (
    <div
      className="min-h-screen flex justify-center items-center w-full p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
        style={{ border: `solid 1px ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>
        <p className="text-gray-600 mb-8 ">
          {" "}
          create your acount to get started with delicious food deliveries.
        </p>
        {/* fullName */}

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            onChange={(e)=> setfullName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus-border-orange-500"
            placeholder="Enter your full name"
            style={{ border: `solid 1px ${borderColor}` }}
            value={fullName}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            id='Email'
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus-border-orange-500"
            placeholder="Enter your Email"
            style={{ border: `solid 1px ${borderColor}` }}
            value={email}
          />

        </div>

        {/* mobile */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="Mobile"
          >
            Mobile
          </label>
          <input
            type="text"
            id="Mobile"
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus-border-orange-500"
            placeholder="Enter your Mobile Number"
            style={{ border: `solid 1px ${borderColor}` }}
            value={mobile}
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus-border-orange-500"
              placeholder="Enter yourPassword"
              onChange={(e) => setPassword(e.target.value)}
              style={{ border: `solid 1px ${borderColor}` }}
              value={password}
            />

            <button
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {/* role */}

          <div className="mb-4">
            <label
              htmlFor="Role"
              className="block text-gray-700 font-medium mb-1"
            >
              Role
            </label>
            <div className="flex gap-2">
              {["user", "owner", "deliveryBoy"].map((val) => (
                <button id="Role" className="flex-1 border rounded-lg py-2 px-3 align-middle justify-center text-center font-medium transition-colors " style={role == val ? {backgroundColor: primaryColor, color: "white"} : {borderColor:primaryColor,color:primaryColor}}  onClick={()=>setRole(val)}>
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>  
        <button className={`w-full mt-4 gap-2 font-semibold flex justify-center text-center px-4 py-2 border rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]`} onClick={handleSignUp} >
            Sign Up
        </button>

        <button className="w-full mt-4 gap-2  font-semibold flex justify-center items-center text-center px-4 py-2 border-gray-400  rounded-lg transition duration-200 hover:bg-gray-100 cursor-pointer ">
              <FcGoogle size={20} />
            <span className="text-gray-600">signup up with Google</span>
        </button>
            <p className="text-center mt-2 cursor-pointer"   onClick={()=> navigate("/signin")}>Aleardy have an acount ? <span  className={`text-[#ff4d2d]`}>SingIn</span></p>
      </div>

        
    </div>
  );
}
