import Student from "../models/Student.js";
import School from "../models/School.js";

// CREATE STUDENT
export const createStudent = async (req, res, next) => {
    const schoolId = req.params.schoolid;
    const newStudent = new Student(req.body)

    try {
        const savedStudent = await newStudent.save()
        try {
            await School.findByIdAndUpdate(schoolId, {$push : {students: savedStudent._id}})
            // await School.findByIdAndUpdate(schoolId, {$push : {students: {...savedStudent}}})
        } catch(err){
            next(err) 
        }
        res.status(200).json(savedStudent) 
    } catch (err) { 
        next(err)
    }  
}
// UPDATE STUDENT
export const updateStudent = async (req, res, next) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedStudent)
    } catch (err) {
        next(err)
        // res.status(500).json(err)
    } 
}
// DELETE STUDENT
export const deleteStudent = async (req, res, next) => {
    const schoolId = req.params.schoolid;
    try {
        const savedStudent = await Student.findByIdAndDelete(req.params.id)
        await Student.findByIdAndDelete(req.params.id)
        try {
            await School.findByIdAndUpdate(schoolId, {$pull : {students: req.params.id}})
            // await School.findByIdAndUpdate(schoolId, {$pull : {students: req.params.id}})
            // await School.findByIdAndUpdate(schoolId, {$push : {students: {...savedStudent}}})

        } catch(error){
            next(err)
        }
        res.status(200).json(`Successfully deleted a Student`)
    } catch (err) {
        // next(err)
        res.status(500).json(err)
    }  
}
// GET A STUDENT
export const getStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id)
        res.status(200).json(student)
    } catch (err) {
        next(err)
        // res.status(500).json(err)
    }      
}

// GET ALL STUDENTS
export const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find()
        res.status(200).json(students)
    } catch (err) {
        next(err)
    }  
}