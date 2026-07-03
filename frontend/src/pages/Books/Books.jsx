import { useState, useEffect } from "react";
import { getBooks, addBook, updateBook, deleteBook } from "../../api/bookApi";
import Table from "../../components/table/table";
import Modal from "../../components/Modal/Modal";
import SearchBar from "../../components/searchbar/SearchBar";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "./Books.css";

function Books() {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        BookId: "",
        price: "",
        pages: "",
        Total_Copies: "",
        Available_Copies: ""
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    async function fetchBooks() {
        try {
            const res = await getBooks();
            const data = res.data;
            setBooks(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching books", error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const openAddModal = () => {
        setEditId(null);
        setFormData({
            title: "", author: "", BookId: "", price: "", pages: "", Total_Copies: "", Available_Copies: ""
        });
        setIsModalOpen(true);
    };

    const openEditModal = (book) => {
        setEditId(book._id);
        setFormData({
            title: book.title,
            author: book.author,
            BookId: book.BookId,
            price: book.price,
            pages: book.pages,
            Total_Copies: book.Total_Copies,
            Available_Copies: book.Available_Copies
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateBook(editId, formData);
            } else {
                await addBook(formData);
            }
            setIsModalOpen(false);
            fetchBooks();
        } catch (error) {
            console.error("Error saving book", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await deleteBook(id);
                fetchBooks();
            } catch (error) {
                console.error("Error deleting book", error);
            }
        }
    };

    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(search.toLowerCase()) || 
        book.author.toLowerCase().includes(search.toLowerCase())
    );

    const tableColumns = ["Book ID", "Title", "Author", "Total", "Available", "Actions"];
    const tableData = filteredBooks.map(book => [
        book.BookId,
        book.title,
        book.author,
        book.Total_Copies,
        book.Available_Copies,
        <div className="action-btns" key={book._id}>
            <button className="edit-btn" onClick={() => openEditModal(book)}><FaEdit /></button>
            <button className="delete-btn" onClick={() => handleDelete(book._id)}><FaTrash /></button>
        </div>
    ]);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Manage Books</h1>
                <button className="add-btn" onClick={openAddModal}>
                    <FaPlus /> Add New Book
                </button>
            </div>

            <SearchBar placeholder="Search by title or author..." value={search} onChange={handleSearch} />

            <Table columns={tableColumns} data={tableData} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? "Edit Book" : "Add Book"}>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>Book ID</label>
                    <input type="text" name="BookId" value={formData.BookId} onChange={handleInputChange} required />
                    
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                    
                    <label>Author</label>
                    <input type="text" name="author" value={formData.author} onChange={handleInputChange} required />
                    
                    <label>Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                    
                    <label>Pages</label>
                    <input type="number" name="pages" value={formData.pages} onChange={handleInputChange} required />
                    
                    <label>Total Copies</label>
                    <input type="number" name="Total_Copies" value={formData.Total_Copies} onChange={handleInputChange} required />
                    
                    <label>Available Copies</label>
                    <input type="number" name="Available_Copies" value={formData.Available_Copies} onChange={handleInputChange} required />

                    <button type="submit" className="submit-btn">{editId ? "Update" : "Save"}</button>
                </form>
            </Modal>
        </div>
    );
}

export default Books;