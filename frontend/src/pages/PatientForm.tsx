import { useState, useEffect } from "react";
import { api } from "../api";
import "../styles/Patients.css";

interface Patient {
  _id?: string;
  name: string;
  gender: string;
  age?: number;
  weight?: number;
  contactNo: string;
  occupation: string;
  address: string;
}

interface Props {
  patient?: Patient;
  onClose: () => void;
  onSave: () => void;
}

const PatientForm = ({ patient, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState<Patient>(
    patient || {
      name: "",
      gender: "",
      age: undefined,
      weight: undefined,
      contactNo: "",
      occupation: "",
      address: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (patient) {
      await api.put(`/patients/${patient._id}`, formData);
    } else {
      await api.post("/patients", formData);
    }
    onSave();
  };

  useEffect(() => {
    // Disable scrolling when the modal is open
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable scrolling when the modal is closed
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="modal show d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: -60,
        left: -23,
        width: "100vw",
        height: "100vh",
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-lg">
        <div
          className="modal-content"
          style={{
            borderRadius: "12px",
          }}
        >
          <div
            className="modal-header"
            style={{
              backgroundColor: "#5c4033",
              color: "rgb(214, 178, 105)",
              padding: "8px 14px",
            }}
          >
            <h5 className="modal-title">
              {patient ? `${patient.name}` : "Add Patient"}
            </h5>
            <button
              className="btn-close crossButton"
              onClick={onClose}
            ></button>
          </div>
          <div
            className="modal-body"
            style={{
              backgroundColor: "rgb(214, 178, 105)",
              color: " #5c4033",
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4 mb-2 custom-input">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: "rgba(92, 64, 51, 0.4)",
                      color: "rgb(255, 255, 255)",
                      border: "none",
                    }}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <label className="form-label">Gender</label>
                  <select
                    name="gender"
                    className="form-control"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: "rgba(92, 64, 51, 0.4)",
                      color: "rgb(255, 255, 255)",
                      border: "none",
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="col-md-4 mb-2">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="form-control"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: "rgba(92, 64, 51, 0.4)",
                      color: "rgb(255, 255, 255)",
                      border: "none",
                    }}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <label className="form-label">Weight</label>
                  <input
                    type="number"
                    name="weight"
                    className="form-control"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: "rgba(92, 64, 51, 0.4)",
                      color: "rgb(255, 255, 255)",
                      border: "none",
                    }}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <label className="form-label">Contact No</label>
                  <input
                    type="number"
                    name="contactNo"
                    className="form-control"
                    value={formData.contactNo}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Allow only digits
                      if (value.length <= 10) {
                        handleChange(e); // Update state only if within limit
                      }
                    }}
                    required
                    maxLength={10}
                    style={{
                      backgroundColor: "rgba(92, 64, 51, 0.4)",
                      color: "rgb(255, 255, 255)",
                      border: "none",
                    }}
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <label className="form-label">Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    className="form-control"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: "rgba(92, 64, 51, 0.4)",
                      color: "rgb(255, 255, 255)",
                      border: "none",
                    }}
                  />
                </div>
                <div className="col-md-12 mb-2">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    style={{
                      backgroundColor: "rgba(92, 64, 51, 0.4)",
                      color: "rgb(255, 255, 255)",
                      border: "none",
                    }}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn ms-2"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
