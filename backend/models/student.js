import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    SId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    regno: { type: String, required: true, unique: true },
    department: { type: String, required: true }
})

const studentModel = mongoose.model('Student', studentSchema)
export default studentModel