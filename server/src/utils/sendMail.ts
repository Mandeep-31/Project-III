import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTP = async (
  email: string,
  otp: string
) => {

  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject: "FocusPact OTP Verification",

    html: `
      <h2>Your OTP Code</h2>

      <h1>${otp}</h1>

      <p>This OTP expires in 5 minutes.</p>
    `,
  });

};