import { v1 as uuid } from "uuid";

import patients from "../data/patients";

import { PublicPatient, NewPatient, Patient } from "../types";

import { genderMap } from "../mappers/gender.map";

const getEntries = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender: genderMap[gender],
      occupation,
      entries,
    })
  );
};

const getEntryById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);

  if (!patient) {
    return;
  }

  const patientToReturn = { ...patient, gender: genderMap[patient.gender] };

  return patientToReturn;
};

const addEntry = (newPatientEntry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...newPatientEntry,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getEntryById,
  addEntry,
};
