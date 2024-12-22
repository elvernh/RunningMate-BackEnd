import express from "express"
import { authMiddleware } from "../middleware/auth-middleware"
import { UserController } from "../controller/user-controller"

export const apiRouter = express.Router()
apiRouter.use(authMiddleware)

apiRouter.post("/register", UserController.register)
apiRouter.post("/login", UserController.login)
apiRouter.post("/logout", UserController.logout)