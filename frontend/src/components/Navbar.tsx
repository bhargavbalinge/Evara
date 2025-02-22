import { Link } from "react-router-dom";

const Navbar = () => (
  <nav
    className="navbar navbar-expand-lg navbar-light p-0"
    style={{
      backgroundColor: "#5C4033",
      color: "rgb(214, 178, 105)",
      fontWeight: 600,
    }}
  >
    {/* More Background colours #2C3E50, #4D1A1A, #4A4036, #3B3B3B, #5C4033,rgb(214, 178, 105) */}
    <div className="container-fluid d-flex align-items-center justify-content-between">
      {/* Left Section - Two Logos and Brand Name */}
      <div className="d-flex align-items-center">
        <img
          src="/Evara Text Logo.png"
          alt="Logo 1"
          className="me-2"
          style={{ height: "60px" }}
        />
      </div>

      {/* Center Section - Navigation Links */}
      <div className="d-flex flex-grow-1 justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/"
              style={{ color: "rgb(214, 178, 105)", fontWeight: 700 }}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/patients"
              style={{ color: "rgb(214, 178, 105)", fontWeight: 700 }}
            >
              Patients
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Section - Welcome Text and Image */}
      <div className="d-flex align-items-center">
        <span className="me-2">Welcome, Dr. Akansha Arudkar</span>
        <img
          src="/Profile.jpeg"
          alt="Doctor"
          className="rounded-circle"
          style={{ height: "40px", width: "40px" }}
        />
      </div>
    </div>
  </nav>
);

export default Navbar;
