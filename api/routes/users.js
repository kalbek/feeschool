import express from "express";
import {  deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("You are logged in and can delete account")
// })
router.get("/checkadmin/:id", (req, res, next) => {
    res.send("Hello Admin You are logged in and can delete account")
})
// UPDATE
router.put("/:id", verifyUser, updateUser)
// DELETE
router.delete("/:id", verifyUser, deleteUser)
// GET
router.get("/:id", verifyUser, getUser)
// GET ALL
router.get("/", getUsers)
export default router