import { useState } from "react";
import { api } from "../api";

interface Patient {
  _id?: string;
  name: string;
  gender: string;
  age: number;
  weight: number;
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
      age: 0,
      weight: 0,
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

  return (
    <div
      className="modal show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {patient ? `${patient.name}` : "Add Patient"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4 mb-2">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
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
                  />
                </div>
                <div className="col-md-4 mb-2">
                  <label className="form-label">Contact No</label>
                  <input
                    type="text"
                    name="contactNo"
                    className="form-control"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
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
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
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
