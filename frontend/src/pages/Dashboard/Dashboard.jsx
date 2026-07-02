import { useState, useEffect } from "react";
import "./Dashboard.css";
import DashboardCard from "../../components/DashboardCard/dashboard";
import Table from "../../components/table/table";
import { getBooks } from "../../api/bookApi";
import { getStudents } from "../../api/studentApi";
import { getHistory } from "../../api/borrowApi";
import { FaBook, FaUsers, FaExchangeAlt, FaExclamationTriangle } from "react-icons/fa";

function Dashboard() {
    const [stats, setStats] = useState({
        totalBooks: 0,
        totalStudents: 0,
        borrowed: 0,
        overdue: 0
    });
    const [recentBorrows, setRecentBorrows] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [booksRes, studentsRes, historyRes] = await Promise.all([
                getBooks(),
                getStudents(),
                getHistory()
            ]);

            const books = booksRes.data;
            const students = studentsRes.data;
            const history = historyRes.data;

            let borrowedCount = 0;
            let overdueCount = 0;

            const today = new Date();

            history.forEach(record => {
                if (record.status === "borrowed") {
                    borrowedCount++;
                    const dueDate = new Date(record.dueDate);
                    if (dueDate < today) {
                        overdueCount++;
                    }
                }
            });

            setStats({
                totalBooks: books.length,
                totalStudents: students.length,
                borrowed: borrowedCount,
                overdue: overdueCount
            });

            // Get the 5 most recent borrows
            const recent = history.slice(-5).reverse();
            setRecentBorrows(recent);

        } catch (error) {
            console.error("Error fetching dashboard data", error);
        }
    };

    const columns = ["Student", "Book", "Due Date", "Status"];

    const data = recentBorrows.map(record => [
        record.studentId ? record.studentId.name : "Unknown",
        record.bookId ? record.bookId.title : "Unknown",
        new Date(record.dueDate).toLocaleDateString(),
        <span style={{
            fontWeight: "bold",
            color: record.status === "borrowed" ? "#F59E0B" : (record.status === "returned" ? "#22C55E" : "#EF4444")
        }}>
            {record.status.toUpperCase()}
        </span>
    ]);

    return (
        <div>
            <h1>Library Overview Dashboard</h1>
            <p className="subtitle">Track books, students, and borrow activity in real time.</p>

            <div className="card-grid">
                <DashboardCard title="Total Books" value={stats.totalBooks} icon={<FaBook />} color="#2563EB" />
                <DashboardCard title="Students" value={stats.totalStudents} icon={<FaUsers />} color="#22C55E" />
                <DashboardCard title="Borrowed" value={stats.borrowed} icon={<FaExchangeAlt />} color="#F59E0B" />
                <DashboardCard title="Overdue" value={stats.overdue} icon={<FaExclamationTriangle />} color="#EF4444" />
            </div>

            <h2 className="table-title">Recent Borrow Activity</h2>
            <Table columns={columns} data={data} />
        </div>
    );
}

export default Dashboard;