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
exports.PublicUserService = void 0;
const database_1 = require("../application/database");
const user_model_1 = require("../models/user-model");
const response_error_1 = require("../error/response-error");
class PublicUserService {
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all users from the database
                const users = yield database_1.prismaClient.user.findMany({});
                // Ensure async mapping using Promise.all
                const userResponses = yield Promise.all(users.map((user) => (0, user_model_1.toPublicUserResponse)(user)) // Assuming toPublicUserResponse is asynchronous
                );
                return userResponses; // Return the list of user responses
            }
            catch (error) {
                // Handle errors gracefully
                throw new response_error_1.ResponseError(401, "Failed to retrieve users");
            }
        });
    }
}
exports.PublicUserService = PublicUserService;
