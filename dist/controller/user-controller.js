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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_model_1 = require("../models/user-model");
const user_service_1 = require("../service/user-service");
const database_1 = require("../application/database");
class UserController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield user_service_1.UserService.register(request);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                // pass to the middleware if error exists
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield user_service_1.UserService.login(request);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield user_service_1.UserService.logout(req.user);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentUser = req.user; // Assuming `req.user` contains the current logged-in user object
                if (!currentUser) {
                    return res.status(400).json({ message: "User not found or not authenticated" });
                }
                // Fetch all users using the UserService
                const users = yield user_service_1.UserService.getAllUsers(currentUser);
                res.status(200).json(users);
            }
            catch (error) { // Explicitly typing the error as `unknown`
                if (error instanceof Error) { // Check if the error is an instance of Error
                    next(new Error(`Failed to retrieve users: ${error.message}`)); // Handle the error gracefully
                }
                else {
                    next(new Error('An unknown error occurred.'));
                }
            }
        });
    }
    static getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield user_service_1.UserService.getUser(req.user, Number(req.params.user_id));
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getUserData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extract userId from the request parameters (or authentication)
                const userId = parseInt(req.params.userId, 10); // Assuming userId comes from the params
                // Call the UserService to get the user's data
                const userData = yield user_service_1.UserService.getUserDashboard(userId);
                // Return the user data as the response
                res.status(200).json({
                    data: userData
                });
            }
            catch (error) {
                // Pass any errors to the next error handling middleware
                next(error);
            }
        });
    }
    // static async getUser(req: UserRequest, res: Response)
    static getAllUser(currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch all users excluding the current user
            const allUsers = yield database_1.prismaClient.user.findMany({
                where: {
                    NOT: { user_id: currentUser.user_id }, // Exclude current user from the results
                },
            });
            // Map through all users and generate their public responses
            const publicUserResponses = yield Promise.all(allUsers.map((user) => (0, user_model_1.toPublicUserResponse)(user)) // Generate response for each user
            );
            return publicUserResponses;
        });
    }
    static deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.userId, 10);
                const user = yield database_1.prismaClient.user.delete({
                    where: {
                        user_id: userId,
                    },
                });
                res.status(200).json({ message: "User deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
