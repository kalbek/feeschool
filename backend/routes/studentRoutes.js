const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

const { 
    getStudents,
    setStudents,
    updateStudents,
    deleteStudents,

} = require('../controllers/studentController')

router.route('/').get(protect, getStudents).post(protect, setStudents)
router.route('/:id').put(protect, updateStudents).delete(protect, deleteStudents)

module.exports = router