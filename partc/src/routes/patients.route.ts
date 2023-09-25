import express from "express";

import patientsService from "../services/patients.service";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getEntries());
});

export default router;