import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import GenderIcon from "../GenderIcon";
import BaseEntry from "../BaseEntry";

import { Box, Typography } from "@mui/material";

import { Diagnosis, Patient } from "../../types";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";

const PatientPage = () => {
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;

      const patient = await patientService.getById(id);

      setPatient(patient);
    };

    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();

      setDiagnoses(diagnoses);
    };

    fetchDiagnoses();
  }, []);

  return (
    <Box style={{ marginTop: "2em" }}>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Typography variant='h5'>{patient?.name}</Typography>
        <GenderIcon icon={patient?.gender} />
      </Box>
      <Box>
        <Typography style={{ marginBottom: "0.5em" }}>
          <strong>SSN:</strong> {patient?.ssn}
        </Typography>
        <Typography style={{ marginBottom: "0.5em" }}>
          <strong>Occupation:</strong> {patient?.occupation}
        </Typography>
        <Typography style={{ marginBottom: "0.5em" }}>
          <strong>Date of birth:</strong> {patient?.dateOfBirth}
        </Typography>
        <Typography variant='h6'>Entries</Typography>
        {patient?.entries.map((entry) => (
          <BaseEntry key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
      </Box>
    </Box>
  );
};

export default PatientPage;
