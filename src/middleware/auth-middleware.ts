import { Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../type/user-request";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {

        const publicRoutes = ["/achievements", "/challenges", "/users"];
        if (req.path.startsWith('/assets') || publicRoutes.includes(req.path)) {
            console.log("Request Path:", req.path); 
            return next(); // Skip authentication for static files and public routes
        }

        const token = req.get("X-API-TOKEN");
        console.log(token)
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
