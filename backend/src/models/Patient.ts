import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  weight: Number,
  contactNo: String,
  occupation: String,
  address: String,
  history: String,
  bp: String,
  pulse: String,
  rr: String,
  complaint: String,
  therapy: String,
});

const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;
