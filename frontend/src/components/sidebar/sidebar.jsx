import "./sidebar.css";
import { NavLink } from "react-router-dom";
import {
    FaBook,
    FaUsers,
    FaHistory,
    FaHome,
    FaExchangeAlt
} from "react-icons/fa";

function Sidebar() {

    return (

        <div className="sidebar">

            <div className="logo">

                <h2>📚</h2>
                <h3>Library LMS</h3>

            </div>

            <nav>

                <NavLink to="/dashboard">
                    <FaHome />
                    Dashboard
                </NavLink>

                <NavLink to="/books">
                    <FaBook />
                    Books
                </NavLink>

                <NavLink to="/students">
                    <FaUsers />
                    Students
                </NavLink>

                <NavLink to="/borrow">
                    <FaExchangeAlt />
                    Borrow
                </NavLink>

                <NavLink to="/history">
                    <FaHistory />
                    History
                </NavLink>

            </nav>

        </div>

    );

}

export default Sidebar;