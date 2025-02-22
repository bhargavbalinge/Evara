import { useState, useEffect } from "react";
import { api } from "../api";

interface Patient {
  _id: string;
  name: string;
  history?: string;
  bp?: string;
  pulse?: string;
  rr?: string;
  complaint?: string;
  therapy?: string;
}

interface Props {
  patient: Patient;
  onClose: () => void;
}

const PatientInfo = ({ patient, onClose }: Props) => {
  const [formData, setFormData] = useState<Patient>(
    patient || {
      history: "",
      bp: "",
      pulse: "",
      rr: "",
      complaint: "",
      therapy: "",
    }
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const res = await api.get<Patient>(`/patients/${patient._id}`);
        setFormData(res.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [patient._id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await api.put(`/patients/${patient._id}`, formData);
      onClose();
    } catch (error) {
      console.error("Error updating patient data:", error);
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{formData.name}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <p>Loading patient data...</p>
            ) : (
              <>
                <div className="container">
                  <div className="row">
                    {/* Column 1 */}
                    <div className="col-md-4 mb-3">
                      <label className="form-label">History</label>
                      <input
                        type="text"
                        name="history"
                        className="form-control"
                        value={formData.history || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Blood Pressure (B.P)</label>
                      <input
                        type="text"
                        name="bp"
                        className="form-control"
                        value={formData.bp || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Pulse</label>
                      <input
                        type="text"
                        name="pulse"
                        className="form-control"
                        value={formData.pulse || ""}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Column 2 */}
                    <div className="col-md-4 mb-3">
                      <label className="form-label">
                        Respiratory Rate (R.R)
                      </label>
                      <input
                        type="text"
                        name="rr"
                        className="form-control"
                        value={formData.rr || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Complaint</label>
                      <textarea
                        name="complaint"
                        className="form-control"
                        value={formData.complaint || ""}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Therapy</label>
                      <textarea
                        name="therapy"
                        className="form-control"
                        value={formData.therapy || ""}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn btn-secondary ms-2" onClick={onClose}>
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
