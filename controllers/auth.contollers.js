import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/genToken.js";
import { sendOtpMail } from "../utils/Email.js";

export const singUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if(user) {
      return res.status(401).json({ message: "User Already exist." });
    }
    if(password.length < 6) {
      return res
        .status(401)
        .json({ message: "password must be at least 6 characters." });
    }
    if(mobile.length < 10) {
      return res
        .status(401)
        .json({ message: "mobile must be at least 10 digits." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      fullName,
      email,
      role,
      mobile,
      password: hashedPassword,
    });

    const token = genToken(user._id);
    user.password = undefined;
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(`sing Up error ${error}`);
  }
};



export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login success",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};


export const signOut = async (req,res) => {
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"log Out successfully"});
    }catch (error){
        return res.status(500).json(`Sign Out error ${error}`);
    }
}

export const sendOtp = async (req,res) => {
    try{
      const {email} = req.body
      const user = await User.findOne({email})
      if(!user) {
        return res.status(404).json({ message: "User dose not exist." });
      }

      const otp = Math.floor(1000 + Math.random() * 9000).toString()
      user.resetOtp = otp
      user.otpExpires = Date.now() + 5 * 60 * 1000
      user.isOtpverified = false
      await user.save()
      await sendOtpMail(email,otp)
      return res.status(200).json({message: "opt send succsessfully"})
    }catch (error) {
      return res.status(500).json(`send otp error ${error}`)
    }
}

export const verifyOtp = async (req,res) => {
   try{  const {otp,email} = req.body
    const user = await User.findOne({email})
    if(!user || user.resetOtp !== otp || user.otpExpires < Date.now()){
    return res.status(400).json({message: "invalid/expired otp"})
    }
    user.resetOtp = undefined
    user.isOtpverified = true
    user.otpExpires = undefined
    await user.save()
      return res.status(200).json({message: "otp verify succsessfully"})
  }catch (error) {
    return res.status(500).json(`enter valid otp ${error}`) 
  }
}

export const resetPassword = async ( req,res ) => {
  try{
    const {newpassword ,email} = req.body
    const user = await User.findOne({email})
    if(!user || !user.isOtpverified ){
      return res.status(200).json({message:"otp verification require"})
    }
  const hashedPassword = await bcrypt.hash(newpassword,10)
  user.password = hashedPassword
  user.isOtpverified = false
  await user.save()
  return res.status(200).json({message: "password verify successfully"})
  }catch (error){
    return res.status(500).json(`reset password error ${error}`) 
  }
} 

export const googleAuth = async (req,res) => {
  try{
  const { fullName,email,mobile,role} = req.body
  const user = await  User.findOne({email}) 
  if(!user) {
      user = await User.create({
        fullName, email,mobile,role
      })
  }

 const token =  genToken(user._id);
    user.password = undefined;
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(201).json(user);

}catch (error){
    return res.status(500).json(`google auth error: ${error}`)
  }
}

