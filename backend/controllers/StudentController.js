import studentModel from '../models/student.js';

const addStudent = async (req, res) => {
    const student = req.body;
    studentModel.create(student)
        .then(() => {
            res.status(200).send("Student added successfully")
        })
        .catch((err) => {
            res.status(500).send("Error adding student")
        })
}

const updateStudent = async (req, res) => {
    const student = req.body;
    const id = req.params.id;
    studentModel.findByIdAndUpdate(id, student)
        .then(() => {
            res.status(200).send("Student updated successfully")
        })
        .catch((err) => {
            res.status(500).send("Error updating student")
        })
}

const deleteStudent = async (req, res) => {
    const id = req.params.id;
    studentModel.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send("Student deleted successfully")
        })
        .catch((err) => {
            res.status(500).send("Error deleting student")
        })
}

const AllStudents = async (req, res) => {
    studentModel.find()
        .then((students) => {
            res.status(200).send(students)
        })
        .catch((err) => {
            res.status(500).send("Error getting students")
        })
}

const Student = async (req, res) => {
    const id = req.params.id;
    studentModel.findById(id)
        .then((student) => {
            res.status(200).send(student)
        })
        .catch((err) => {
            res.status(500).send("Error getting student")
        })
}

export {
    addStudent,
    updateStudent,
    deleteStudent,
    AllStudents,
    Student
}