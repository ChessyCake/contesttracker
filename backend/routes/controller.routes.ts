import { Router } from "express"
import { getContests } from "../controller/contests.controller";
const router = Router()

router.get("/upcoming-contests", getContests)

export default router