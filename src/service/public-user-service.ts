import { NextFunction } from "express";
import { UserRequest } from "../type/user-request";
import { prismaClient } from "../application/database";
import {
  PublicUserResponse,
  toPublicUserResponse,
  toPublicUserResponseList,
} from "../models/user-model";
import { User } from "@prisma/client";
import { ResponseError } from "../error/response-error";

export class PublicUserService {
    static async getAllUsers(): Promise<PublicUserResponse[]> {
        try {
          // Fetch all users from the database
          const users: User[] = await prismaClient.user.findMany({});
          
          // Ensure async mapping using Promise.all
          const userResponses = await Promise.all(
            users.map((user) => toPublicUserResponse(user)) // Assuming toPublicUserResponse is asynchronous
          );
    
          return userResponses; // Return the list of user responses
        } catch (error) {
          // Handle errors gracefully
          throw new ResponseError(401, "Failed to retrieve users");
        }
      }
}
