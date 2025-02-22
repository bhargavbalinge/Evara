import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getActiveStyle = (path: string) => ({
    backgroundColor:
      location.pathname === path ? "rgb(214, 178, 105)" : "transparent",
    color:
      location.pathname === path ? "rgb(92, 64, 51)" : "rgb(214, 178, 105)",
    borderRadius: "16px",
    padding: "2px 12px",
  });

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light p-0 shadow-lg sticky-top"
      style={{
        backgroundColor: "#5C4033",
        color: "rgb(214, 178, 105)",
        fontWeight: 600,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Custom shadow
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Left Section - Logo */}
        <div className="d-flex align-items-center">
          <img
            src="/Evara Text Logo.png"
            alt="Logo"
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
                style={{
                  ...getActiveStyle("/"),
                  fontWeight: 700,
                  fontSize: "20px",
                  marginRight: "8px",
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/patients"
                style={{
                  ...getActiveStyle("/patients"),
                  fontWeight: 700,
                  fontSize: "20px",
                }}
              >
                Patients
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section - Welcome Text and Profile Image */}
        <div className="d-flex align-items-center">
          <span className="me-2">Welcome, Dr. Akansha Arudkar</span>
          <img
            src="/Profile.jpeg"
            alt="Doctor"
            className="rounded-circle"
            style={{
              height: "40px",
              width: "40px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", // Adds shadow to the profile picture
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
