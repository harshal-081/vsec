
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import ReportItem from "./pages/ReportItem";
import ViewItems from "./pages/ViewItems";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="navbar">
          <NavLink to="/" className="brand">
            <span className="brand-icon">✦</span>
            <span>
              <strong>Campus</strong>
              <small>LOST & FOUND</small>
            </span>
          </NavLink>

          <nav className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/items">Browse Items</NavLink>
            <NavLink to="/report" className="nav-report">
              + Report Item
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportItem />} />
          <Route path="/items" element={<ViewItems />} />
        </Routes>

        <footer className="site-footer">
          <p>Campus Lost & Found</p>
          <span>Helping campus belongings find their way home.</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
