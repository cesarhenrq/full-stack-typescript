import express from "express";

import patientsService from "../services/patients.service";

import { toNewEntry, toNewPatientEntry } from "../utils";

import { BadRequestError } from "../errors";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientsService.getEntryById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(
      req.body as Record<string, unknown>
    );
    const addedPatient = patientsService.addEntry(newPatientEntry);
    res.json(addedPatient);
  } catch (e: unknown) {
    if (e instanceof BadRequestError) {
      res.status(400).send(e.message);
      return;
    }

    res.status(500).send("Unknown error");
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body as Record<string, unknown>);
    const addedEntry = patientsService.addEntryToPatient(
      req.params.id,
      newEntry
    );
    res.json(addedEntry);
  } catch (e: unknown) {
    if (e instanceof BadRequestError) {
      res.status(400).send(e.message);
      return;
    }

    res.status(500).send("Unknown error");
  }
});

export default router;
