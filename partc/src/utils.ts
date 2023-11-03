import { NewPatient, Gender } from "./types";

import { BadRequestError } from "./errors";

export const toNewPatientEntry = (
  object: Record<string, unknown>
): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new BadRequestError("Incorrect or missing data");
  }

  if (areRequiredFieldsPresent(object)) {
    const newPatient: NewPatient = {
      name: parseStringField(object.name),
      dateOfBirth: parseStringField(object.dateOfBirth),
      ssn: parseStringField(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation),
    };

    return newPatient;
  }

  throw new BadRequestError("Incorrect or missing data");
};

const areRequiredFieldsPresent = (object: Record<string, unknown>): boolean => {
  const requiredFields: (keyof NewPatient)[] = [
    "name",
    "dateOfBirth",
    "ssn",
    "gender",
    "occupation",
  ];

  return requiredFields.every((field) => field in object);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseStringField = (field: unknown): string => {
  if (!field || !isString(field)) {
    throw new BadRequestError("Incorrect or missing field: " + field);
  }

  return field;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new BadRequestError("Incorrect or missing field: " + gender);
  }

  return gender;
};
