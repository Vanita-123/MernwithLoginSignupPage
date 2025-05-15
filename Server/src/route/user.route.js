import express from "express";
import { deleteUser, getUser, singleUser, signup, updateUser ,login } from "../controllers/user.controller.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/getusers", getUser);
router.get("/singleusers/:id", singleUser);
router.delete("/deleteusers/:id", deleteUser);
router.put("/putusers/:id", updateUser);

export default router;
