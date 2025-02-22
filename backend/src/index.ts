import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import patientRoutes from "./routes/patientRoutes";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/patients", patientRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
