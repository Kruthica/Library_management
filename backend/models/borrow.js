import mongoose from 'mongoose';

const borrowSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
    returnDate: { type: Date },
    status: { type: String, default: "borrowed", enum: ["borrowed", "returned", "overdue"] }
})

const borrowModel = mongoose.model('Borrow', borrowSchema)
export default borrowModel