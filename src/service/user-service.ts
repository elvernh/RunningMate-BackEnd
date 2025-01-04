import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { DashboardResponse, LoginUserRequest, PublicUserResponse, RegisterUserRequest, UserResponse, toDashboardResponse, toPublicUserResponse, toPublicUserResponseList, toUserResponse } from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validations";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserService {
    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(
            UserValidation.REGISTER,
            request
        )
        const email = await prismaClient.user.findFirst({
            where: {
                email: registerRequest.email,
            },
        })


        if (email) {
            throw new ResponseError(400, "Email already exists!")
        }

        registerRequest.password = await bcrypt.hash(
            registerRequest.password,
            10
        )

        // add user to database
        const user = await prismaClient.user.create({
            data: {
                username: registerRequest.username,
                email: registerRequest.email,
                password: registerRequest.password,
                token: uuid(),
            },
        })
        return toUserResponse(user)
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request)

        const user = await prismaClient.user.findFirst({
            where: {
                email: loginRequest.email,
            },
        })

        if (!user) {
            throw new ResponseError(400, "Invalid email or password!")
        }

        const passwordIsValid = await bcrypt.compare(
            loginRequest.password,
            user.password
        )

        if (!passwordIsValid) {
            throw new ResponseError(400, "Invalid email or password!")        
        }

        const updateUser = await prismaClient.user.update({
            where: {
                user_id: user.user_id,
            },
            data: {
                token: uuid(),
            },
        })

        const response = toUserResponse(user)

        return response
    }

    static async logout(user: User): Promise<string> {
        const result = await prismaClient.user.update({
            where: {
                user_id: user.user_id,
            },
            data: {
                token: null,
            },
        })

        return "Logout Successful!";
    }

    static async getAllUsers(currentUser: User): Promise<PublicUserResponse[]> {
        try {
            // Fetch all users, excluding the current user
            const allUsers = await prismaClient.user.findMany({
                where: {
                    NOT: { user_id: currentUser.user_id }, // Exclude current user from the result
                },
            });

            // Map through all users and generate their public responses
            return toPublicUserResponseList(allUsers)
            // return publicUserResponses;
        } catch (error) {
            throw new Error(`Failed to retrieve users: ${error}`);
        }
    }

    static async getUser(currentUser: User, user_id: number): Promise<PublicUserResponse> {
        try {
            // Fetch the user by ID, ensuring it's not the current user
            const user = await prismaClient.user.findUnique({
                where: {
                    user_id: user_id,
                },
            });
    
            // Check if the user exists and isn't the current user
            if (!user || user.user_id === currentUser.user_id) {
                throw new Error("User not found or cannot fetch yourself.");
            }
    
            // Convert the fetched user to a public user response
            return await toPublicUserResponse(user);
        } catch (error) {
            throw new Error(`Failed to retrieve user with ID ${user_id}: ${error}`);
        }
    }

    static async getUserDashboard(userId: number): Promise<DashboardResponse>{
        try{
            const user = await prismaClient.user.findUnique({
                where: { user_id: userId },
                include: {
                    achievements: true,
                    notifications: true,
                    runs: true,
                    challenges: true,
                    friendLists: true,
                },
            });
            if (!user) {
                throw new Error("User not found");
            }
            return toDashboardResponse(user);
        }catch(error){
            throw new Error(`Failed to retrieve user with ID ${userId}: ${error}`)
        }
    }
    
}
