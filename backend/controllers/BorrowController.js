import borrowModel from '../models/borrow.js';
import studentModel from '../models/student.js';
import bookModel from '../models/book.js';


const borrow = async (req, res) => {
    try {
        const { studentId, bookId, dueDate } = req.body;

        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.status(404).send("Student not found");
        }

        const book = await bookModel.findById(bookId);
        if (!book) {
            console.log(req.body);
            return res.status(404).send("Book not found");
        }

        if (book.Available_Copies <= 0) {
            return res.status(400).send("Book not available");
        }

        const borrowRecord = await borrowModel.create({
            studentId,
            bookId,
            dueDate,
            status: "borrowed"
        });


        book.Available_Copies -= 1;
        await book.save();

        return res.status(200).json({
            message: "Book borrowed successfully",
            data: borrowRecord
        });

    } catch (error) {
        console.error("Borrow Error:", error);
        return res.status(500).send("Internal Server Error");
    }
};

const returnbook = async (req, res) => {
    try {
        const borrowid = req.params.id;

        const borrow = await borrowModel.findById(borrowid);
        if (!borrow) {
            return res.status(404).send("Borrow not found")
        }
        if (borrow.status === "returned") {
            return res.status(400).send("Book is already returned");
        }

        borrow.status = "returned";
        borrow.returnDate = new Date();
        await borrow.save();

        const book = await bookModel.findById(borrow.bookId);
        if (!book) {
            return res.status(404).send("Book not found");
        }

        book.Available_Copies += 1;
        await book.save();

        return res.status(200).send("Book returned successfully");
    } catch (error) {
        console.error("Error in /return:", error);
        return res.status(500).send("Internal Server Error");
    }
};

const getAllBorrows = async (req, res) => {
    try {
        const borrows = await borrowModel
            .find()
            .populate("studentId", "name regno department SId -_id")
            .populate("bookId", "title author BookId -_id")
            .select("-__v");
        res.status(200).json(borrows);

    } catch (error) {
        res.status(500).send("Error fetching borrows");
    }
};

export {
    borrow,
    returnbook,
    getAllBorrows
}