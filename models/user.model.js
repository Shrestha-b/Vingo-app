import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    fullName:{
        type:String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,   
    },
    mobile:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum: ["user","owenr","deliveryBoy"],
        require: true
    }
}, {timestamps: true}
)

const User = mongoose.model("User", userSchema)

export default User;