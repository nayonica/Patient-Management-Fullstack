const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let patients = [
  {
    id: 1,
    patientName: "Arun Kumar",
    patientId: "P101",
    disease: "Fever",
    doctorName: "Dr. Priya",
    treatmentDate: "2026-06-20",
    status: "Under Treatment"
  },
  {
    id: 2,
    patientName: "Meena",
    patientId: "P102",
    disease: "Diabetes",
    doctorName: "Dr. Karthik",
    treatmentDate: "2026-06-21",
    status: "Admitted"
  }
];

// Home route
app.get("/", (req, res) => {
  res.send("Patient Management Backend Running");
});

// Get all patients
app.get("/patients", (req, res) => {
  res.json(patients);
});

// Add patient
app.post("/patients", (req, res) => {
  const {
    patientName,
    patientId,
    disease,
    doctorName,
    treatmentDate,
    status
  } = req.body;

  if (
    !patientName ||
    !patientId ||
    !disease ||
    !doctorName ||
    !treatmentDate ||
    !status
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newPatient = {
    id: Date.now(),
    patientName,
    patientId,
    disease,
    doctorName,
    treatmentDate,
    status
  };

  patients.push(newPatient);
  res.status(201).json(newPatient);
});

// Delete patient
app.delete("/patients/:id", (req, res) => {
  const id = Number(req.params.id);
  patients = patients.filter((patient) => patient.id !== id);
  res.json({ message: "Patient deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});