import { useState, useEffect } from "react";
import { api } from "../api";
import PatientForm from "./PatientForm";
import PatientInfo from "./PatientInfo";
import { Modal, Button, Card } from "react-bootstrap";

interface Patient {
  _id: string;
  name: string;
  gender: string;
  age: number;
  weight: number;
  contactNo: string;
  occupation: string;
  address: string;
  history?: string;
  bp?: string;
  pulse?: string;
  rr?: string;
  complaint?: string;
  therapy?: string;
}

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | undefined>(
    undefined
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const res = await api.get<Patient[]>("/patients");
    setPatients(res.data);
  };

  const handleAdd = () => {
    setEditingPatient(undefined);
    setShowForm(true);
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchPatients();
  };

  const confirmDelete = (patient: Patient) => {
    setPatientToDelete(patient);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (patientToDelete) {
      await api.delete(`/patients/${patientToDelete._id}`);
      fetchPatients();
    }
    setShowDeleteModal(false);
  };

  const handleInfo = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowInfo(true);
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary float-end" onClick={handleAdd}>
        Add Patient
      </button>
      <h2>Patients</h2>

      {patients.length === 0 ? (
        <Card className="text-center mt-4 p-4 shadow-sm">
          <Card.Body>
            <Card.Title>No Patients Found</Card.Title>
            <Card.Text>
              There are no patients added yet. Click "Add Patient" to register a
              new patient.
            </Card.Text>
            <Button variant="primary" onClick={handleAdd}>
              Add Patient
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Weight</th>
              <th>Contact No.</th>
              <th>Occupation</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, i) => (
              <tr
                key={i}
                onClick={() => handleInfo(p)}
                style={{ cursor: "pointer" }}
              >
                <td>{p.name}</td>
                <td>{p.gender}</td>
                <td>{p.age}</td>
                <td>{p.weight}</td>
                <td>{p.contactNo}</td>
                <td>{p.occupation}</td>
                <td>{p.address}</td>
                <td
                  onClick={(e) => e.stopPropagation()} // Prevent row click when clicking buttons
                >
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => confirmDelete(p)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <PatientForm
          patient={editingPatient}
          onClose={handleCloseForm}
          onSave={handleCloseForm}
        />
      )}

      {showInfo && selectedPatient && (
        <PatientInfo
          patient={selectedPatient}
          onClose={() => setShowInfo(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete data of{" "}
          <strong>{patientToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Patients;
