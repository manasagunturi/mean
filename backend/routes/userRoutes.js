import express from "express";
import {
    registerUser,
    loginUser,
    logout,
    getAllUsers} from "../controllers/userController.js";


const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/users").get(getAllUsers);




export default router;