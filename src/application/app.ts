import express, { Router } from "express"
import { publicRouter } from "../route/public-api"
import { apiRouter } from "../route/api"

const app = express()
app.use(express.json())
app.use(publicRouter)
app.use(apiRouter)
export default app