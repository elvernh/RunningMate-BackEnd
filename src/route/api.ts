import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";

export const apiRouter = express.Router();

// Apply authMiddleware to all routes in apiRouter
apiRouter.use(authMiddleware);

// Define authenticated routes
// apiRouter.post("/logout", authMiddleware, UserController.logout);


apiRouter.post("/api/logout", UserController.logout);