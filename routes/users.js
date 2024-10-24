import { Router } from "express";
import { getProfile, getUserAdverts, loginUser, logoutUser, registerUser,updateProfile } from "../controllers/users.js";
import {hasPermission, isAuthenticated} from "../middlewares/auth.js";

//create a router
const userRouter = Router();

//define routes

userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", loginUser);

userRouter.get("/users/me", isAuthenticated, hasPermission("get_profile"), getProfile);

userRouter.get("/users/me/adverts", isAuthenticated, getUserAdverts);

userRouter.post("/users/logout", isAuthenticated, logoutUser);

userRouter.patch("/users/me", isAuthenticated, hasPermission("update_profile"), updateProfile);

//export Router
export default userRouter;