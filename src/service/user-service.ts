import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { LoginUserRequest, RegisterUserRequest, UserResponse, toUserResponse } from "../models/user-model";
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

    static async logout(user: User): Promise<void> {
        const result = await prismaClient.user.update({
            where: {
                user_id: user.user_id,
            },
            data: {
                token: null,
            },
        })
    }
}
