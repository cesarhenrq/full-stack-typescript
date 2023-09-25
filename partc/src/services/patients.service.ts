import patients from "../data/patients";

import PublicPatient from "../types";

const getEntries = (): PublicPatient[] => {
  return patients.map((patient) => {
    const { ssn, ...rest } = patient;
    return rest;
  });
};

export default {
  getEntries,
};
