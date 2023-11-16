import React, { useEffect } from "react";

import { useParams } from "react-router-dom";

import GenderIcon from "../GenderIcon";

import { Box, Typography } from "@mui/material";

import { Patient } from "../../types";

import patientService from "../../services/patients";

const PatientPage = () => {
  const [patient, setPatient] = React.useState<Patient | undefined>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;

      const patient = await patientService.getById(id);

      setPatient(patient);
    };

    fetchPatient();
  }, [id]);

  console.log(patient);

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
        <Typography>
          <strong>2021-09-10</strong> Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quisquam, voluptatem.
        </Typography>
      </Box>
    </Box>
  );
};

export default PatientPage;
