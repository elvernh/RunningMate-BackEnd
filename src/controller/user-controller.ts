import { Request, Response, NextFunction } from "express";
import { LoginUserRequest, PublicUserResponse, RegisterUserRequest, UserResponse, toPublicUserResponse } from "../models/user-model";
import { UserRequest } from "../type/user-request";
import { UserService } from "../service/user-service"
import { prismaClient } from "../application/database";
import { User } from "@prisma/client";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response: UserResponse = await UserService.register(request)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            // pass to the middleware if error exists
            next(error)
        }
    }
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as LoginUserRequest
            const response = await UserService.login(request)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.logout(req.user!)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllUsers(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const currentUser = req.user; // Assuming `req.user` contains the current logged-in user object
            if (!currentUser) {
                return res.status(400).json({ message: "User not found" });
            }
            // Fetch all users using the UserService
            const users = await UserService.getAllUsers(currentUser);

            // Return the list of public user responses
            res.status(200).json(users);
        } catch (error) {
            next(error); // Forward the error to the error-handling middleware
        }
    }

    static async getUser(req: UserRequest, res: Response, next: NextFunction){
        try{
            const response = await UserService.getUser(req.user!, Number(req.params.user_id))
            res.status(200).json(response);
        }catch(error){
            next(error)
        }
    }

    // static async getUser(req: UserRequest, res: Response)

    // static async getAllUser(currentUser: User): Promise<PublicUserResponse[]> {
    //     // Fetch all users excluding the current user
    //     const allUsers = await prismaClient.user.findMany({
    //         where: {
    //             NOT: { user_id: currentUser.user_id }, // Exclude current user from the results
    //         },
    //     });
    
    //     // Map through all users and generate their public responses
    //     const publicUserResponses = await Promise.all(
    //         allUsers.map((user) => toPublicUserResponse(user)) // Generate response for each user
    //     );
    
    //     return publicUserResponses;
    // }
    
    // static async getAllUser(req: UserRequest, res: Response, next: NextFunction){
    //     try{

    //     }
    // }
}