import  express  from "express";
import { UserController } from "../controller/user-controller";

export const publicRouter = express.Router()
publicRouter.post("/login", UserController.login)
publicRouter.post("/register", UserController.register)