import express from "express";
import { signOut, singIn, singUp } from "../controllers/auth.contollers.js";


const authRouter = express.Router()

authRouter.post("/signup", singUp);
authRouter.post("/SingIn", singIn)
authRouter.get("/SingOut", signOut)

export default authRouter   