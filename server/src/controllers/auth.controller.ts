import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

import { sendOTP } from "../utils/sendMail";
import prisma from "../config/prisma";

export const register = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;

    const existingUser =
      await prisma.user.findFirst({
        where: {
          OR: [
            { email },
            { username }
          ]
        }
      });

    if (existingUser) {

  // verified user already exists
  if (existingUser.isVerified) {

    return res.status(400).json({
      message: "User already exists"
    });

  }

  // resend OTP for unverified user
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const otpExpiry = new Date(
    Date.now() + 5 * 60 * 1000
  );

  await prisma.user.update({
    where: {
      id: existingUser.id
    },

    data: {
      otp,
      otpExpiry,
    }
  });

  console.log("Resent OTP:", otp);

  await sendOTP(email, otp);

  return res.status(200).json({
    message: "OTP resent successfully"
  });

}

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const otpExpiry = new Date(
      Date.now() + 5 * 60 * 1000
    );

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
      }
    });

    console.log("OTP:", otp);

    // later:
    await sendOTP(email, otp);

    res.status(201).json({
      message: "OTP generated",
      userId: user.id,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }
    if (!user.isVerified) {
  return res.status(400).json({
    message: "Please verify your email first"
  });
}

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      "focuspact_secret",
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};
export const verifyOTP = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      email,
      otp
    } = req.body;

    const user =
      await prisma.user.findUnique({
        where: {
          email
        }
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    if (
      user.otpExpiry &&
      new Date() > user.otpExpiry
    ) {
      return res.status(400).json({
        message: "OTP expired"
      });
    }

    await prisma.user.update({
      where: {
        id: user.id
      },

      data: {
        isVerified: true,
        otp: null,
        otpExpiry: null,
      }
    });

    res.status(200).json({
      message: "Email verified successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};