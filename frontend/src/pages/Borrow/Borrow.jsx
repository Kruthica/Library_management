import { useState, useEffect } from "react";
import { getStudents } from "../../api/studentApi";
import { getBooks } from "../../api/bookApi";
import { borrowBook } from "../../api/borrowApi";
import "../Books/Books.css"; // Reuse styling for container/header
import "./Borrow.css"; // Specialized styling for this form

function Borrow() {
    const [students, setStudents] = useState([]);
    const [books, setBooks] = useState([]);
    
    const [formData, setFormData] = useState({
        studentId: "",
        bookId: "",
        dueDate: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const studentRes = await getStudents();
            const bookRes = await getBooks();
            setStudents(studentRes.data);
            setBooks(bookRes.data.filter(b => b.Available_Copies > 0)); // Only show available books
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await borrowBook(formData);
            alert("Book borrowed successfully!");
            setFormData({ studentId: "", bookId: "", dueDate: "" });
            fetchData(); // Refresh available books
        } catch (error) {
            console.error("Error borrowing book", error);
            alert("Failed to borrow book. Check console.");
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Borrow a Book</h1>
            </div>

            <div className="borrow-form-container">
                <form onSubmit={handleSubmit} className="borrow-form">
                    
                    <div className="borrow-form-group">
                        <label>Select Student</label>
                        <select name="studentId" value={formData.studentId} onChange={handleInputChange} required>
                            <option value="">-- Choose a Student --</option>
                            {students.map(student => (
                                <option key={student._id} value={student._id}>
                                    {student.name} ({student.regno})
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="borrow-form-group">
                        <label>Select Book</label>
                        <select name="bookId" value={formData.bookId} onChange={handleInputChange} required>
                            <option value="">-- Choose a Book --</option>
                            {books.map(book => (
                                <option key={book._id} value={book._id}>
                                    {book.title} (Available: {book.Available_Copies})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="borrow-form-group full-width">
                        <label>Due Date</label>
                        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} required />
                    </div>

                    <button type="submit" className="borrow-btn">Borrow Book</button>
                </form>
            </div>
        </div>
    );
}

export default Borrow;