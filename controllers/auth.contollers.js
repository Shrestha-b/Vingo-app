import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/genToken.js";
export const singUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if(user) {
      return res.status(404).json({ message: "User Already exist." });
    }
    if(password.length <= 6) {
      return res
        .status(404)
        .json({ message: "password must be at least 6 characters." });
    }
    if (mobile.length <= 10) {
      return res
        .status(404)
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

    const token = await genToken(user._id);
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


export const singIn = async (req, res) => {
  try {
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User dose not exist." });
    }
   const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(404).json({ message: "Incorrect password" });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`Sign In error ${error}`);
  }
};


export const signOut = async (params) => {
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"log Out successfully"});
    }catch (error){
        return res.status(500).json(`Sign Out error ${error}`);
    }
}