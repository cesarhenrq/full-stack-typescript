import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import GenderIcon from "../GenderIcon";
import BaseEntry from "../BaseEntry";
import AddEntryForm from "../AddEntryForm";

import { Box, Typography, Button } from "@mui/material";

import { Diagnosis, NewEntryFormValues, Patient } from "../../types";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";
import { isAxiosError } from "axios";

const PatientPage = () => {
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

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

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (newEntryFormValues: NewEntryFormValues) => {
    try {
      const entry = await patientService.createEntry(
        id as string,
        newEntryFormValues
      );
      if (!patient) return;
      setPatient({ ...patient, entries: patient?.entries.concat(entry) });
    } catch (e) {
      if (isAxiosError(e)) {
        setError(e.response?.data);
      } else {
        throw e;
      }

      setTimeout(() => {
        setError(undefined);
      }, 5000);
    }
  };

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
        <Box>
          <Button
            variant='contained'
            onClick={handleOpen}
            style={{ display: `${isOpen ? "none" : "block"}` }}
          >
            Add New Entry
          </Button>
          <AddEntryForm
            isOpen={isOpen}
            onClose={handleClose}
            onSubmit={handleSubmit}
            error={error}
          />
        </Box>
        <Typography variant='h6'>Entries</Typography>
        {patient?.entries.map((entry) => (
          <BaseEntry key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
      </Box>
    </Box>
  );
};

export default PatientPage;
