import { v1 as uuid } from "uuid";

import patients from "../data/patients";

import { PublicPatient, NewPatient } from "../types";

const getEntries = (): PublicPatient[] => {
  return patients.map((patient) => {
    const { ssn, ...rest } = patient;
    return rest;
  });
};

const addEntry = (newPatientEntry: NewPatient) => {
  const newPatient = {
    id: uuid(),
    ...newPatientEntry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addEntry,
};
