import "./Layout.css";

import Sidebar from "../sidebar/sidebar";
import Header from "../header/header";

import { Outlet } from "react-router-dom";

function Layout() {

    return (

        <div className="layout">

            <Sidebar />

            <div className="main">

                <Header />

                <div className="page">

                    <Outlet />

                </div>

            </div>

        </div>

    )

}

export default Layout;