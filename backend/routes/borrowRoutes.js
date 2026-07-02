import express from 'express';
import {
    borrow,
    returnbook,
    getAllBorrows
} from '../controllers/BorrowController.js';

const router = express.Router();

router.get('/', getAllBorrows);
router.post('/', borrow);
router.put('/return/:id', returnbook);

export default router;