import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    BookId: { type: Number, unique: true },
    price: { type: Number, required: true },
    pages: { type: Number, required: true, min: 0 },
    Total_Copies: { type: Number, required: true, min: 0 },
    Available_Copies: { type: Number, required: true, min: 0 }
})

const bookModel = mongoose.model('Book', bookSchema)
export default bookModel