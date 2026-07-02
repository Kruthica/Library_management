import "./Header.css";

function Header() {

    const today = new Date();

    return (

        <div className="header">

            <h2>Library Management System</h2>

            <p>{today.toDateString()}</p>

        </div>

    )

}

export default Header;