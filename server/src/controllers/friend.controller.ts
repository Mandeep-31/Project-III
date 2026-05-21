import { Request, Response } from "express";

import prisma from "../config/prisma";

export const sendFriendRequest =
  async (
    req: any,
    res: Response
  ) => {

    try {

      const senderId =
        req.user.id;

      const { receiverId } =
        req.body;

      if (senderId === receiverId) {
        return res.status(400).json({
          message:
            "You cannot add yourself"
        });
      }

      const existingRequest =
        await prisma.friendRequest.findFirst({
          where: {
            senderId,
            receiverId,
          }
        });

      if (existingRequest) {
        return res.status(400).json({
          message:
            "Friend request already sent"
        });
      }

      const request =
        await prisma.friendRequest.create({
          data: {
            senderId,
            receiverId,
          }
        });

      res.status(201).json({
        message:
          "Friend request sent",
        request
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error"
      });

    }

};
export const getPendingRequests =
  async (
    req: any,
    res: Response
  ) => {

    try {

      const userId =
        req.user.id;

      const requests =
        await prisma.friendRequest.findMany({
          where: {
            receiverId: userId,
            status: "PENDING",
          },

          include: {
            sender: {
              select: {
                id: true,
                username: true,
                email: true,
              }
            }
          }
        });

      res.status(200).json(
        requests
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error"
      });

    }

};

export const acceptFriendRequest =
  async (
    req: any,
    res: Response
  ) => {

    try {

      const userId =
        req.user.id;

      const { requestId } =
        req.body;

      const request =
        await prisma.friendRequest.findFirst({
          where: {
            id: requestId,
            receiverId: userId,
          }
        });

      if (!request) {

        return res.status(404).json({
          message:
            "Request not found"
        });

      }

      await prisma.friendRequest.update({
        where: {
          id: requestId
        },

        data: {
          status: "ACCEPTED"
        }
      });

      res.status(200).json({
        message:
          "Friend request accepted"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error"
      });

    }

};
export const getFriends =
  async (
    req: any,
    res: Response
  ) => {

    try {

      const userId =
        req.user.id;

      const friends =
        await prisma.friendRequest.findMany({
          where: {
            OR: [
              {
                senderId: userId,
                status: "ACCEPTED",
              },
              {
                receiverId: userId,
                status: "ACCEPTED",
              }
            ]
          },

          include: {
            sender: {
              select: {
                id: true,
                username: true,
                email: true,
              }
            },

            receiver: {
              select: {
                id: true,
                username: true,
                email: true,
              }
            }
          }
        });

      res.status(200).json(
        friends
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server error"
      });

    }

};