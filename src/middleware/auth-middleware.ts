import { Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type/user-request";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
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

        const user = await prismaClient.user.findFirst({
            where: { token },
        });

        if (!user) {
            res.status(401).json({ error: "Invalid or expired token" });
            return; // Ensure no further processing
        }

        req.user = user; // Attach user to the request
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        next(error); // Pass error to the global error handler
    }
};
