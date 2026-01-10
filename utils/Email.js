import nodemailer from "nodemailer";
import dotenv from "dotenv";
// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendOtpMail = async(to ,otp) => {
    await transporter.sendMail({
        from : `${process.env.EMAIL}`,
        to : to,
        subject: "reset your password",
        html: `<p>Your Otp for Password reset is <b>${otp}</b>.It expires in 5 minutes.</p>`
    })
}