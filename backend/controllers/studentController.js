const asyncHandler = require('express-async-handler')
const Student = require('../models/studentModel')
const User = require('../models/userModel')

// @desc Get students
// @route GET /api/students
// @ access Private
const getStudents = asyncHandler(async (req, res) => {
    // find school only by logged in user
    const students = await Student.find({user: req.user.id})
    res.status(200).json(students)     
})

// @desc Set students
// @route SET /api/students
// @ access Private
const setStudents = asyncHandler(async(req, res) => {
    // if(!req.body.text){
    //     res.status(400)
    //     throw new Error('Please add a text field')
    // }
    const student = await Student.create({
        user: req.user.id,
        fname: req.body.fname,
        lname: req.body.lname,
        grade: req.body.grade,
        section: req.body.section,
    })
    res.status(200).json(student)   
})

// @desc Update students 
// @route PUT /api/students
// @ access Private
const updateStudents = asyncHandler(async(req, res) => {
    const student = await Student.findById(req.params.id)

    if (!student){
        res.status(400)
        throw new Error('School not found')
    }
    const user = await User.findById(req.user.id)
    // check for user
    if (!user){
        res.status(401)
        throw new Error('user Not Found')
    }
    // make sure the logged in user mathced the students user
    if (student.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized')
    }
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.
        body, {
            new: true,
        })
    res.status(200).json(updatedStudent)
})

// @desc Delete students
// @route DELETE /api/students
// @ access Private
const deleteStudents = asyncHandler(async(req, res) => {
    const student = await Student.findById(req.params.id)

    if (!student){
        res.status(400)
        throw new Error('Student not found')
    }
    if (!student){
        res.status(400)
        throw new Error('Student not found')
    }
    const user = await User.findById(req.user.id)
    // check for user
    if (!user){
        res.status(401)
        throw new Error('user Not Found')
    }
    // make sure the logged in user mathced the students user
    if (student.user.toString() !== user.id){
        res.status(401)
        throw new Error('user not authorized')
    }
    await student.remove()
    res.status(200).json( {id: req.params.id})
})
module.exports = {
    getStudents,
    setStudents,
    updateStudents,
    deleteStudents,
}