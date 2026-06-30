import express from 'express'
import {
    borrow,
    returnbook,
    getAllBorrows
} from '../controllers/BorrowController.js'
const router = express.Router();

router.post('/borrow', borrow)
router.post('/returnbook/:id', returnbook)
router.get('/all', getAllBorrows)

export default router   