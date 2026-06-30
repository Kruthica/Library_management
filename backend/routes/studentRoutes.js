import express from 'express'
import {
    addStudent,
    updateStudent,
    deleteStudent,
    AllStudents,
    Student
} from '../controllers/StudentController.js'
const router = express.Router();

router.post('/addStudent', addStudent)
router.put('/updateStudent/:id', updateStudent)
router.delete('/deleteStudent/:id', deleteStudent)
router.get('/AllStudents', AllStudents)
router.get('/Student/:id', Student)

export default router;
