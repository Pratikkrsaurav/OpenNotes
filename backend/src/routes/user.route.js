import express from "express";
import { register, login, logout } from "../controller/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get('/me', protect, (req, res) => {
    res.status(200).json({
         message: "user authenticated succesfully", 
         user: req.user 
        })
})

router.get("/admin", protect, authorize("admin"), (req, res) => {
    res.status(200).json({ message: "Welcome Admin! You have access to this route."})
})

export default router;