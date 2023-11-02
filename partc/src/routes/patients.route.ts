import express from "express";

import patientsService from "../services/patients.service";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getEntries());
});

router.post("/", (req, res) => {
  const newPatientEntry = patientsService.addEntry(req.body);
  res.json(newPatientEntry);
});

export default router;
