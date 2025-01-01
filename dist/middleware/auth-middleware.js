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
exports.authMiddleware = void 0;
const database_1 = require("../application/database");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicRoutes = ["/achievements", "/challenges"];
        if (publicRoutes.includes(req.path)) {
            return next();
        }
        const token = req.get("X-API-TOKEN");
        if (!token) {
            res.status(401).json({ error: "Missing API token" });
            return; // Ensure no further processing
        }
        const user = yield database_1.prismaClient.user.findFirst({
            where: { token },
        });
        if (!user) {
            res.status(401).json({ error: "Invalid or expired token" });
            return; // Ensure no further processing
        }
        req.user = user; // Attach user to the request
        next(); // Pass control to the next middleware or route handler
    }
    catch (error) {
        console.error("Error in authMiddleware:", error);
        next(error); // Pass error to the global error handler
    }
});
exports.authMiddleware = authMiddleware;
