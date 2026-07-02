import "./Landing.css";
import { useNavigate } from "react-router-dom";
import background from "../../assets/images/library.jpg";
import { FaBookOpen } from "react-icons/fa";

function Landing() {

    const navigate = useNavigate();

    return (

        <div
            className="landing"
            style={{ backgroundImage: `url(${background})` }}
        >

            <div className="overlay">

                <div className="content">

                    <FaBookOpen className="book-icon" />

                    <h2>Library Management System</h2>

                    <p>
                        Manage Books • Students • Borrowing
                    </p>

                    <span>
                        Knowledge is the key to success.
                    </span>

                    <button
                        onClick={() => navigate("/dashboard")}
                    >
                        Enter Library →
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Landing;