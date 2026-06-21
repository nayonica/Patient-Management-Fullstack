import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    disease: "",
    doctorName: "",
    treatmentDate: "",
    status: ""
  });

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/patients");
      setPatients(res.data);
    } catch (error) {
      console.log("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPatient = async () => {
    const {
      patientName,
      patientId,
      disease,
      doctorName,
      treatmentDate,
      status
    } = formData;

    if (
      !patientName ||
      !patientId ||
      !disease ||
      !doctorName ||
      !treatmentDate ||
      !status
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/patients", formData);
      setFormData({
        patientName: "",
        patientId: "",
        disease: "",
        doctorName: "",
        treatmentDate: "",
        status: ""
      });
      fetchPatients();
    } catch (error) {
      console.log("Error adding patient:", error);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.log("Error deleting patient:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="main-card">
        <h1 className="title">Patient Management System</h1>
        <p className="subtitle">Manage patient details and treatment records</p>

        <div className="form-grid">
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="patientId"
            placeholder="Patient ID"
            value={formData.patientId}
            onChange={handleChange}
          />

          <input
            type="text"
            name="disease"
            placeholder="Disease"
            value={formData.disease}
            onChange={handleChange}
          />

          <input
            type="text"
            name="doctorName"
            placeholder="Doctor Name"
            value={formData.doctorName}
            onChange={handleChange}
          />

          <input
            type="date"
            name="treatmentDate"
            value={formData.treatmentDate}
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Admitted">Admitted</option>
            <option value="Under Treatment">Under Treatment</option>
            <option value="Discharged">Discharged</option>
          </select>
        </div>

        <button className="add-btn" onClick={handleAddPatient}>
          Add Patient
        </button>

        <h2 className="section-title">Patient Records</h2>

        {patients.length === 0 ? (
          <p className="empty-text">No patient records found</p>
        ) : (
          <div className="patient-list">
            {patients.map((patient) => (
              <div className="patient-card" key={patient.id}>
                <div className="patient-info">
                  <p><strong>Name:</strong> {patient.patientName}</p>
                  <p><strong>ID:</strong> {patient.patientId}</p>
                  <p><strong>Disease:</strong> {patient.disease}</p>
                  <p><strong>Doctor:</strong> {patient.doctorName}</p>
                  <p><strong>Treatment Date:</strong> {patient.treatmentDate}</p>
                  <p><strong>Status:</strong> {patient.status}</p>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDeletePatient(patient.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;