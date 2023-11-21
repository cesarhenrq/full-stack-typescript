import { v1 as uuid } from "uuid";

import patients from "../data/patients";

import { PublicPatient, NewPatient, Patient, Entry, NewEntry } from "../types";

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

const addEntryToPatient = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find((patient) => patient.id === patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry = { ...entry, id: uuid() };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getEntries,
  getEntryById,
  addEntry,
  addEntryToPatient,
};
