import express from "express";
import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../controllers/student.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/student", (req,res)=>{
//     res.send("This is a student endpoint")
// })
// router.get("/students", (req,res)=>{
//     res.send("This is students endpoint")
// })



router.post("/:schoolid", verifyAdmin, createStudent)
// UPDATE
router.put("/:id", verifyAdmin,updateStudent)
// DELETE
router.delete("/:id/:schoolid", verifyAdmin,deleteStudent)
// GET
router.get("/:id", getStudent)
// GET ALL
router.get("/", getStudents)
export default router