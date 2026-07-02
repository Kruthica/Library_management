import express from 'express';
import {
    addBook,
    updateBook,
    deleteBook,
    AllBooks,
    Book
} from '../controllers/BookController.js';

const router = express.Router();

router.get('/', AllBooks);
router.post('/', addBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.get('/:id', Book);

export default router;
