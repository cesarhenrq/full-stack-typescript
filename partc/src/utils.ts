import { NewPatient, Gender, NewEntry, Diagnosis } from "./types";

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

function isEntryType(type: string): type is NewEntry["type"] {
  return (
    type === "HealthCheck" ||
    type === "OccupationalHealthcare" ||
    type === "Hospital"
  );
}

const areRequiredFieldsPresentInEntry = (
  object: Record<string, unknown>
): boolean => {
  const requiredFields: (keyof NewEntry)[] = [
    "description",
    "date",
    "specialist",
    "type",
  ];

  return requiredFields.every((field) => field in object);
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseEntryType = (type: unknown): NewEntry["type"] => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new BadRequestError("Incorrect or missing field: " + type);
  }

  return type;
};

const isHealthCheckRating = (param: number): boolean => {
  return param >= 0 && param <= 3;
};

const parseHealthCheckRating = (rating: unknown): number => {
  if (!rating || typeof rating !== "number" || !isHealthCheckRating(rating)) {
    throw new BadRequestError(
      "Incorrect or missing health check rating: " + rating
    );
  }

  return rating;
};

const parseSickLeave = (
  sickLeave: unknown
): { startDate: string; endDate: string } => {
  if (!sickLeave || typeof sickLeave !== "object") {
    return { startDate: "", endDate: "" };
  }

  if (!("startDate" in sickLeave) || !("endDate" in sickLeave)) {
    throw new BadRequestError(
      "Incorrect or missing field startDate or endDate"
    );
  }
  const startDate = parseStringField(sickLeave.startDate);
  const endDate = parseStringField(sickLeave.endDate);

  return { startDate, endDate };
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== "object") {
    throw new BadRequestError("Incorrect or missing discharge: " + discharge);
  }

  if (!("date" in discharge) || !("criteria" in discharge)) {
    throw new BadRequestError("Incorrect or missing field date or criteria");
  }
  const date = parseStringField(discharge.date);
  const criteria = parseStringField(discharge.criteria);

  return { date, criteria };
};

export const toNewEntry = (object: Record<string, unknown>): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new BadRequestError("Incorrect or missing data");
  }

  const type = parseEntryType(object.type);

  if (areRequiredFieldsPresentInEntry(object)) {
    switch (type) {
      case "HealthCheck":
        const newHealthCheckEntry = {
          description: parseStringField(object.description),
          date: parseStringField(object.date),
          specialist: parseStringField(object.specialist),
          type,
          diagnosisCodes: parseDiagnosisCodes(object),
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        return newHealthCheckEntry;
      case "OccupationalHealthcare":
        const newOccupationalHealthcareEntry = {
          description: parseStringField(object.description),
          date: parseStringField(object.date),
          specialist: parseStringField(object.specialist),
          type,
          diagnosisCodes: parseDiagnosisCodes(object),
          employerName: parseStringField(object.employerName),
          sickLeave: parseSickLeave(object.sickLeave),
        };

        return newOccupationalHealthcareEntry;

      case "Hospital":
        const newHospitalEntry = {
          description: parseStringField(object.description),
          date: parseStringField(object.date),
          specialist: parseStringField(object.specialist),
          type,
          diagnosisCodes: parseDiagnosisCodes(object),
          discharge: parseDischarge(object.discharge),
        };

        return newHospitalEntry;
      default:
        throw new BadRequestError("Incorrect or missing data");
    }
  }

  throw new BadRequestError("Incorrect or missing data");
};
