import express from "express";
import { AdminLogin, AdminVerifyEmail, adminRegistration, createUser, disableUser, enableUser, getUsers, resetPassword, userLogin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/register",adminRegistration );
router.post("/verify-email",AdminVerifyEmail );
router.post("/login",AdminLogin );
router.post("/create-user",createUser);
router.get("/get-users",getUsers);
router.post("/user-login",userLogin);
router.put('/users/disable/:userId', disableUser);
router.put('/users/enable/:userId', enableUser);
router.put('/forget-password', resetPassword);


export default router;