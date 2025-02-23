import { Copyright } from "lucide-react";
const Footer = () => {
  return (
    <footer
      className="p-2 shadow-lg"
      style={{
        backgroundColor: "#5C4033",
        color: "rgb(214, 178, 105)",
        fontWeight: 600,
        boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.3)", // Top shadow for depth
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left - Copyright Info */}
        <div>
          <span style={{ fontSize: "15px" }}>
            <Copyright style={{ height: "12px", marginRight: "-3px" }} />
            {new Date().getFullYear()} Evara. All rights reserved.
          </span>
        </div>

        {/* Right - Developer Info */}
        <div>
          <span style={{ fontSize: "15px" }}>
            Developed by: <strong>Bhargav Balinge</strong>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
