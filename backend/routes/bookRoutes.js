import express from 'express'
import {
    addBook,
    updateBook,
    deleteBook,
    AllBooks,
    Book,
    BookByTitle,
    BookByAuthor,
    BookByBookId
} from '../controllers/BookController.js'
const router = express.Router();

router.post('/addBook', addBook)
router.put('/updateBook/:id', updateBook)
router.delete('/deleteBook/:id', deleteBook)
router.get('/AllBooks', AllBooks)
router.get('/Book/:id', Book)
router.get('/BookByTitle/:title', BookByTitle)
router.get('/BookByAuthor/:author', BookByAuthor)
router.get('/BookByBookId/:BookId', BookByBookId)

export default router
