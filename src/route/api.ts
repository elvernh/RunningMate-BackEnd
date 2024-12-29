import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { RunController } from "../controller/run-controller";

export const apiRouter = express.Router();

// Apply authMiddleware to all routes in apiRouter
apiRouter.use(authMiddleware);

// Define authenticated routes
// apiRouter.post("/logout", authMiddleware, UserController.logout);

//users
apiRouter.get("/api/users", UserController.getAllUsers)
//run
apiRouter.post("/api/run", RunController.addRun)
apiRouter.delete("/api/run/:run_id", RunController.deleteRun)
apiRouter.post("/api/logout", UserController.logout);