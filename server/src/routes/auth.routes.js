import express from "express"
import { signupAdmin,signInAdmin } from "../controllers/auth.controller.js"

const router=express.Router()


router.post("/sign-up", signupAdmin)
router.post("/sign-in", signInAdmin)
export default router