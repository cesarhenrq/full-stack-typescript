import { v1 as uuid } from "uuid";

import patients from "../data/patients";

import { PublicPatient, NewPatient, Patient } from "../types";

const getEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  })) as PublicPatient[];
};

const addEntry = (newPatientEntry: NewPatient): Patient => {
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
