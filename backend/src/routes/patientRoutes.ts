import express from "express";
import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
  getPatientById,
} from "../controllers/patientController";

const router = express.Router();

router.get("/", getPatients);
router.post("/", addPatient);
router.put("/:id", updatePatient);
router.get("/:id", getPatientById);
router.delete("/:id", deletePatient);

export default router;
