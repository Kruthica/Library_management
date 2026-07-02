import express from 'express';
import {
    addStudent,
    updateStudent,
    deleteStudent,
    AllStudents,
    Student
} from '../controllers/StudentController.js';

const router = express.Router();

router.get('/', AllStudents);
router.post('/', addStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.get('/:id', Student);

export default router;
