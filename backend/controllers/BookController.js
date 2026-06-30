import bookModel from '../models/book.js';

const addBook = (req, res) => {
    const book = req.body;
    bookModel.create(book)
        .then(() => {
            res.status(200).send("Book added successfully")
        })
        .catch((err) => {
            res.status(500).send("Error adding book")
        })
}

const updateBook = (req, res) => {
    const book = req.body;
    const id = req.params.id;
    bookModel.findByIdAndUpdate(id, book)
        .then(() => {
            res.status(200).send("Book updated successfully")
        })
        .catch((err) => {
            res.status(500).send("Error updating book")
        })
}

const deleteBook = async (req, res) => {
    const id = req.params.id;
    bookModel.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send("Book deleted successfully")
        })
        .catch((err) => {
            res.status(500).send("Error deleting book")
        })
}

const AllBooks = (req, res) => {
    bookModel.find()
        .then((books) => {
            res.status(200).send(books)
        })
        .catch((err) => {
            res.status(500).send("Error getting books")
        })
}

const Book = (req, res) => {
    const id = req.params.id;
    bookModel.findById(id)
        .then((book) => {
            res.status(200).send(book)
        })
        .catch((err) => {
            res.status(500).send("Error getting book")
        })
}

const BookByTitle = (req, res) => {
    const title = req.params.title;
    bookModel.find({ title })
        .then((book) => {
            res.status(200).send(book)
        })
        .catch((err) => {
            res.status(500).send("Error getting book")
        })
}

const BookByAuthor = (req, res) => {
    const author = req.params.author;
    bookModel.find({ author })
        .then((book) => {
            res.status(200).send(book)
        })
        .catch((err) => {
            res.status(500).send("Error getting book")
        })
}

const BookByBookId = (req, res) => {
    const BookId = req.params.BookId;
    bookModel.find({ BookId })
        .then((book) => {
            res.status(200).send(book)
        })
        .catch((err) => {
            res.status(500).send("Error getting book")
        })
}

export {
    addBook,
    updateBook,
    deleteBook,
    AllBooks,
    Book,
    BookByTitle,
    BookByAuthor,
    BookByBookId
}