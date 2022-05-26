import express from "express";
import { createSchool, deleteSchool, getSchool, getSchools, updateSchool, countByCity, getSchoolStudents } from "../controllers/school.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/", (req,res)=>{
//     res.send("This is a school endpoint")
// })
// router.get("/schools", (req,res)=>{
//     res.send("This is schools endpoint")
// })

// CREATE
router.post("/", verifyAdmin, createSchool)
// UPDATE
router.put("/:id", verifyAdmin,updateSchool)
// DELETE
router.delete("/delete/:id", verifyAdmin,deleteSchool)
// GET
router.get("/find/:id", getSchool)
// GET ALL
router.get("/", getSchools)
// COUNT BY CITY
router.get("/countByCity", countByCity)
// GET STUDENTS OF A SCHOOL
router.get("/getSchoolStudents/:id", getSchoolStudents)

export default router