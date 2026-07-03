import { useState, useEffect } from "react";
import { getHistory, returnBook } from "../../api/borrowApi";
import Table from "../../components/table/table";
import SearchBar from "../../components/searchbar/SearchBar";
import { FaCheckCircle } from "react-icons/fa";
import "../Books/Books.css";

function History() {
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchHistory();
    }, []);

    async function fetchHistory() {
        try {
            const res = await getHistory();
            const data = res.data;
            setHistory(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching history", error);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleReturn = async (id) => {
        if (window.confirm("Confirm returning this book?")) {
            try {
                await returnBook(id);
                fetchHistory();
            } catch (error) {
                console.error("Error returning book", error);
                alert("Failed to return book");
            }
        }
    };

    const filteredHistory = history.filter(record => {
        const studentName = record.studentId ? record.studentId.name.toLowerCase() : "";
        const bookTitle = record.bookId ? record.bookId.title.toLowerCase() : "";
        const s = search.toLowerCase();
        return studentName.includes(s) || bookTitle.includes(s) || record.status.includes(s);
    });

    const tableColumns = ["Student", "Book", "Borrow Date", "Due Date", "Status", "Actions"];
    
    const tableData = filteredHistory.map(record => [
        record.studentId ? record.studentId.name : "Unknown Student",
        record.bookId ? record.bookId.title : "Unknown Book",
        new Date(record.borrowDate || record.createdAt).toLocaleDateString(),
        new Date(record.dueDate).toLocaleDateString(),
        <span style={{ 
            fontWeight: "bold", 
            color: record.status === "borrowed" ? "#F59E0B" : (record.status === "returned" ? "#22C55E" : "#EF4444") 
        }}>
            {record.status.toUpperCase()}
        </span>,
        <div className="action-btns" key={record._id}>
            {record.status === "borrowed" && (
                <button className="edit-btn" style={{ background: "#22C55E", color: "white" }} onClick={() => handleReturn(record._id)}>
                    <FaCheckCircle style={{ marginRight: '5px' }}/> Return
                </button>
            )}
        </div>
    ]);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Borrow History</h1>
            </div>

            <SearchBar placeholder="Search by student, book, or status..." value={search} onChange={handleSearch} />

            <Table columns={tableColumns} data={tableData} />
        </div>
    );
}

export default History;