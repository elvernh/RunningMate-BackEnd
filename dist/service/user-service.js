"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../models/user-model");
const user_validation_1 = require("../validations/user-validation");
const validations_1 = require("../validations/validations");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validations_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            const email = yield database_1.prismaClient.user.findFirst({
                where: {
                    email: registerRequest.email,
                },
            });
            if (email) {
                throw new response_error_1.ResponseError(400, "Email already exists!");
            }
            registerRequest.password = yield bcrypt_1.default.hash(registerRequest.password, 10);
            // add user to database
            const user = yield database_1.prismaClient.user.create({
                data: {
                    username: registerRequest.username,
                    email: registerRequest.email,
                    password: registerRequest.password,
                    token: (0, uuid_1.v4)(),
                },
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validations_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            const user = yield database_1.prismaClient.user.findFirst({
                where: {
                    email: loginRequest.email,
                },
            });
            if (!user) {
                throw new response_error_1.ResponseError(400, "Invalid email or password!");
            }
            const passwordIsValid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!passwordIsValid) {
                throw new response_error_1.ResponseError(400, "Invalid email or password!");
            }
            const updateUser = yield database_1.prismaClient.user.update({
                where: {
                    user_id: user.user_id,
                },
                data: {
                    token: (0, uuid_1.v4)(),
                },
            });
            const response = (0, user_model_1.toUserResponse)(user);
            return response;
        });
    }
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.user.update({
                where: {
                    user_id: user.user_id,
                },
                data: {
                    token: null,
                },
            });
            return "Logout Successful!";
        });
    }
    static getAllUsers(currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allUsers = yield database_1.prismaClient.user.findMany({
                    where: {
                        NOT: { user_id: currentUser.user_id },
                    },
                });
                return (0, user_model_1.toPublicUserResponseList)(allUsers); // Assuming this is a valid function that formats user responses
            }
            catch (error) { // Typing the error as `unknown`
                if (error instanceof Error) {
                    throw new Error(`Failed to retrieve users: ${error.message}`);
                }
                else {
                    throw new Error('An unknown error occurred.');
                }
            }
        });
    }
    static getUser(currentUser, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch the user by ID, ensuring it's not the current user
                const user = yield database_1.prismaClient.user.findUnique({
                    where: {
                        user_id: user_id,
                    },
                });
                // Check if the user exists and isn't the current user
                if (!user || user.user_id === currentUser.user_id) {
                    throw new Error("User not found or cannot fetch yourself.");
                }
                // Convert the fetched user to a public user response
                return yield (0, user_model_1.toPublicUserResponse)(user);
            }
            catch (error) {
                throw new Error(`Failed to retrieve user with ID ${user_id}: ${error}`);
            }
        });
    }
    static getUserDashboard(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield database_1.prismaClient.user.findUnique({
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
                return (0, user_model_1.toDashboardResponse)(user);
            }
            catch (error) {
                throw new Error(`Failed to retrieve user with ID ${userId}: ${error}`);
            }
        });
    }
}
exports.UserService = UserService;
