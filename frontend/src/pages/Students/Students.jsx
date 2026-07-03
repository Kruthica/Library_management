import { useState, useEffect } from "react";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../../api/studentApi";
import Table from "../../components/table/table";
import Modal from "../../components/Modal/Modal";
import SearchBar from "../../components/searchbar/SearchBar";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import "../Books/Books.css"; // Reuse the same CSS for consistent layout

function Students() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        SId: "",
        name: "",
        regno: "",
        department: ""
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    async function fetchStudents() {
        try {
            const res = await getStudents();
            setStudents(res.data);
        } catch (error) {
            console.error("Error fetching students", error);
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
        setFormData({ SId: "", name: "", regno: "", department: "" });
        setIsModalOpen(true);
    };

    const openEditModal = (student) => {
        setEditId(student._id);
        setFormData({
            SId: student.SId,
            name: student.name,
            regno: student.regno,
            department: student.department
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateStudent(editId, formData);
            } else {
                await addStudent(formData);
            }
            setIsModalOpen(false);
            fetchStudents();
        } catch (error) {
            console.error("Error saving student", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                await deleteStudent(id);
                fetchStudents();
            } catch (error) {
                console.error("Error deleting student", error);
            }
        }
    };

    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(search.toLowerCase()) || 
        student.regno.toLowerCase().includes(search.toLowerCase())
    );

    const tableColumns = ["Student ID", "Name", "Reg No", "Department", "Actions"];
    const tableData = filteredStudents.map(student => [
        student.SId,
        student.name,
        student.regno,
        student.department,
        <div className="action-btns" key={student._id}>
            <button className="edit-btn" onClick={() => openEditModal(student)}><FaEdit /></button>
            <button className="delete-btn" onClick={() => handleDelete(student._id)}><FaTrash /></button>
        </div>
    ]);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Manage Students</h1>
                <button className="add-btn" onClick={openAddModal}>
                    <FaPlus /> Add New Student
                </button>
            </div>

            <SearchBar placeholder="Search by name or reg no..." value={search} onChange={handleSearch} />

            <Table columns={tableColumns} data={tableData} />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editId ? "Edit Student" : "Add Student"}>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>Student ID (SId)</label>
                    <input type="text" name="SId" value={formData.SId} onChange={handleInputChange} required />
                    
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                    
                    <label>Registration Number (Reg No)</label>
                    <input type="text" name="regno" value={formData.regno} onChange={handleInputChange} required />
                    
                    <label>Department</label>
                    <input type="text" name="department" value={formData.department} onChange={handleInputChange} required />

                    <button type="submit" className="submit-btn">{editId ? "Update" : "Save"}</button>
                </form>
            </Modal>
        </div>
    );
}

export default Students;