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
exports.PublicUserController = void 0;
const public_user_service_1 = require("../service/public-user-service");
class PublicUserController {
    static getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield public_user_service_1.PublicUserService.getAllUsers();
                res.status(200).json({ data: users });
            }
            catch (error) {
                // Handle errors by forwarding to error handler
                if (error instanceof Error) {
                    return next(new Error(`Failed to retrieve users: ${error.message}`));
                }
                else {
                    return next(new Error('An unknown error occurred.'));
                }
            }
        });
    }
}
exports.PublicUserController = PublicUserController;
