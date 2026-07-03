import { Routes, Route } from "react-router-dom";

import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Books from "./pages/Books/Books";
import Students from "./pages/Students/Students";
import Borrow from "./pages/Borrow/Borrow";
import History from "./pages/History/History";

import Layout from "./components/Layout/Layout";
console.log(import.meta.env.VITE_API_URL);
function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Pages with Sidebar & Header */}
      <Route element={<Layout />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/students" element={<Students />} />
        <Route path="/borrow" element={<Borrow />} />
        <Route path="/history" element={<History />} />

      </Route>

    </Routes>
  );
}

export default App;