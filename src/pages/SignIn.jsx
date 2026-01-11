import axios from "axios";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function SignIn() {

  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr] = useState("") 
  const navigate = useNavigate();    
  const dispatch = useDispatch();


const handleSignIn = async () => {

  setLoading(true)
    try{
        const result = await axios.post(`${serverUrl}/api/auth/signin`,{email,password},{withCredentials:true})
        dispatch(setUserData(result.data))
        setErr("")
        setLoading(false)
        navigate("/")
        console.log(result)
    }catch (error){
        setErr(error?.response?.data?.message)
        setLoading(false);
    }
}


const handleGoogleSignIn = async () => {
      const provider = new GoogleAuthProvider()
      const result = await signInWithRedirect(auth,provider) 
      console.log(result.user.displayName)
    try {
        const {data} = await axios.post(`${serverUrl}/api/auth/google-auth`, {
          email:result.user.email},{withCredentials:true})
          dispatch(setUserData(data))
    } catch (error) {
          console.log(">>>>>>>>>>>>>>>>",error)
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
          SingIn to get started with delicious food deliveries.
        </p>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="Email"
          >
            Email
          </label>
          <input
          required
            id='Email'
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus-border-orange-500"
            placeholder="Enter your Email"
            style={{ border: `solid 1px ${borderColor}` }}
            value={email}
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
            required
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

        </div>  

        <div className="p-2 text-lg font-medium text-right cursor-pointer" style={{color:primaryColor}} onClick={() => navigate("/forgot-password")}>Forgot Passsword ?</div>

        <button className={`w-full mt-4 gap-2 font-semibold flex justify-center text-center px-4 py-2 border rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]`} disabled={loading} onClick={handleSignIn} >
        {loading  ? <ClipLoader  
        color={color}
        size={20}
        /> : "Sign In"}
        </button>
          {err && <p className="text-red-500 text-center my-[10px]">*{err}</p> }  
        <button className="w-full mt-4 gap-2  font-semibold flex justify-center items-center text-center px-4 py-2 border-gray-400  rounded-lg transition duration-200 hover:bg-gray-100 cursor-pointer ">
              <FcGoogle size={20} />
            <span onClick={handleGoogleSignIn} className="text-gray-600">signIn with Google</span>
        </button>
            <p className="text-center mt-2 cursor-pointer"  onClick={()=> navigate("/signup")}>want to create new acount ? <span  className={`text-[#ff4d2d]`}>SingUp</span></p>
      </div>
    </div>
  );
}
