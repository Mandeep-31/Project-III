import { Request, Response } from "express";

import prisma from "../config/prisma";

interface AuthRequest extends Request {
  user?: any;
}

export const sendFriendRequest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const senderId = req.user.id;

    const { receiverId } = req.body;

    if (senderId === receiverId) {
      return res.status(400).json({
        message: "Cannot send request to yourself"
      });
    }

    const existingRequest =
      await prisma.friendRequest.findFirst({
        where: {
          senderId,
          receiverId
        }
      });

    if (existingRequest) {
      return res.status(400).json({
        message: "Request already sent"
      });
    }

    const request =
      await prisma.friendRequest.create({
        data: {
          senderId,
          receiverId
        }
      });

    res.status(201).json({
      message: "Friend request sent",
      request
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};