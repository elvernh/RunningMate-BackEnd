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
                return res.status(400).json({ message: "User not found or not authenticated" });
            }
    
            // Fetch all users using the UserService
            const users = await UserService.getAllUsers(currentUser);
    
            res.status(200).json(users);
        } catch (error: unknown) {  // Explicitly typing the error as `unknown`
            if (error instanceof Error) { // Check if the error is an instance of Error
                next(new Error(`Failed to retrieve users: ${error.message}`)); // Handle the error gracefully
            } else {
                next(new Error('An unknown error occurred.'));
            }
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

    static async getUserData(req: Request, res: Response, next: NextFunction) {
        try {
            // Extract userId from the request parameters (or authentication)
            const userId = parseInt(req.params.userId, 10);  // Assuming userId comes from the params

            // Call the UserService to get the user's data
            const userData = await UserService.getUserDashboard(userId);

            // Return the user data as the response
            res.status(200).json({
                data: userData
            });
        } catch (error) {
            // Pass any errors to the next error handling middleware
            next(error);
        }
    }

    // static async getUser(req: UserRequest, res: Response)

    static async getAllUser(currentUser: User): Promise<PublicUserResponse[]> {
        // Fetch all users excluding the current user
        const allUsers = await prismaClient.user.findMany({
            where: {
                NOT: { user_id: currentUser.user_id }, // Exclude current user from the results
            },
        });
    
        // Map through all users and generate their public responses
        const publicUserResponses = await Promise.all(
            allUsers.map((user) => toPublicUserResponse(user)) // Generate response for each user
        );
    
        return publicUserResponses;
    }
    
    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.userId, 10);
            const user = await prismaClient.user.delete({
                where: {
                    user_id: userId,
                },
            });
    
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}