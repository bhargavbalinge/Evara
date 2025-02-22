import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(214, 178, 105, 0.7), rgba(214, 178, 105, 0.7)), 
                   url('/Background.jpg') no-repeat center center fixed`,
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
