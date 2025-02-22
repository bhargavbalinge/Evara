import { Request, Response } from "express";
import Patient from "../models/Patient";

export const getPatients = async (_req: Request, res: Response) => {
  const patients = await Patient.find();
  res.json(patients);
};

export const getPatientById = async (req: Request, res: Response) => {
  const patientData = await Patient.findById(req.params.id);
  res.json(patientData);
};
export const addPatient = async (req: Request, res: Response) => {
  const newPatient = new Patient(req.body);
  await newPatient.save();
  res.json(newPatient);
};

export const updatePatient = async (req: Request, res: Response) => {
  await Patient.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Patient updated" });
};

export const deletePatient = async (req: Request, res: Response) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Patient deleted" });
};
