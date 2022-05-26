import User from "../models/User.js";



// UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedUser)
    } catch (err) {
        next(err)
        // res.status(500).json(err)
    } 
}
// DELETE USER
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json(`Successfully deleted user`)
    } catch (err) {
        next(err)
        // res.status(500).json(err)
    }  
}
// GET A USER
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        next(err)
        // res.status(500).json(err)
    }      
}

// GET ALL USERS
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }  
}
