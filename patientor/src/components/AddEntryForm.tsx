import React from "react";

import {
  Box,
  Button,
  FormGroup,
  TextField,
  Typography,
  Select,
  Alert,
} from "@mui/material";

import { Entry, NewEntryFormValues } from "../types";

interface RenderFormDetailsProps {
  type: string;
  hospitalValues: {
    dischargeDate: string;
    dischargeCriteria: string;
  };
  occupationalHealthcareValues: {
    employerName: string;
    sickLeaveStartDate: string;
    sickLeaveEndDate: string;
  };
  healthCheckValues: {
    healthCheckRating: number;
  };
  handleHospitalChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOccupationalHealthcareChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleHealthCheckChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RenderFormDetails = ({
  type,
  hospitalValues,
  occupationalHealthcareValues,
  healthCheckValues,
  handleHospitalChange,
  handleOccupationalHealthcareChange,
  handleHealthCheckChange,
}: RenderFormDetailsProps) => {
  switch (type) {
    case "Hospital":
      return (
        <>
          <FormGroup style={{ marginBottom: "8px" }}>
            <TextField
              id='dischargeDate'
              variant='outlined'
              label='Discharge Date'
              InputLabelProps={{
                shrink: true,
              }}
              type='date'
              value={hospitalValues.dischargeDate}
              onChange={handleHospitalChange}
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: "8px" }}>
            <TextField
              id='dischargeCriteria'
              label='Discharge Criteria'
              variant='outlined'
              value={hospitalValues.dischargeCriteria}
              onChange={handleHospitalChange}
            />
          </FormGroup>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <FormGroup style={{ marginBottom: "8px" }}>
            <TextField
              id='employerName'
              label='Employer Name'
              variant='outlined'
              value={occupationalHealthcareValues.employerName}
              onChange={handleOccupationalHealthcareChange}
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: "8px" }}>
            <TextField
              id='sickLeaveStartDate'
              variant='outlined'
              label='Sick Leave Start Date'
              InputLabelProps={{
                shrink: true,
              }}
              type='date'
              value={occupationalHealthcareValues.sickLeaveStartDate}
              onChange={handleOccupationalHealthcareChange}
            />
          </FormGroup>
          <FormGroup style={{ marginBottom: "8px" }}>
            <TextField
              id='sickLeaveEndDate'
              variant='outlined'
              label='Sick Leave End Date'
              InputLabelProps={{
                shrink: true,
              }}
              type='date'
              value={occupationalHealthcareValues.sickLeaveEndDate}
              onChange={handleOccupationalHealthcareChange}
            />
          </FormGroup>
        </>
      );
    case "HealthCheck":
      return (
        <>
          <FormGroup style={{ marginBottom: "8px" }}>
            <TextField
              id='healthCheckRating'
              label='Health Check Rating'
              variant='outlined'
              type='number'
              value={healthCheckValues.healthCheckRating}
              onChange={handleHealthCheckChange}
            />
          </FormGroup>
        </>
      );
    default:
      return <></>;
  }
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newEntryFormValues: NewEntryFormValues) => Promise<void>;
  error?: string;
}

const AddEntryForm = ({ isOpen, onClose, onSubmit, error }: Props) => {
  const [formValues, setFormValues] = React.useState({
    description: "",
    date: "",
    specialist: "",
    type: "Hospital",
  });

  const [diagnosisCode, setDiagnosisCode] = React.useState("");
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<Array<string>>([]);

  const [hospitalValues, setHospitalValues] = React.useState({
    dischargeDate: "",
    dischargeCriteria: "",
  });

  const [occupationalHealthcareValues, setOccupationalHealthcareValues] =
    React.useState({
      employerName: "",
      sickLeaveStartDate: "",
      sickLeaveEndDate: "",
    });

  const [healthCheckValues, setHealthCheckValues] = React.useState({
    healthCheckRating: 0,
  });

  const handleHospitalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHospitalValues({
      ...hospitalValues,
      [event.target.id]: event.target.value,
    });
  };

  const handleOccupationalHealthcareChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOccupationalHealthcareValues({
      ...occupationalHealthcareValues,
      [event.target.id]: event.target.value,
    });
  };

  const handleHealthCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHealthCheckValues({
      ...healthCheckValues,
      [event.target.id]: event.target.value,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value });
  };

  const handleSubmit = async () => {
    const BaseEntry = {
      description: formValues.description,
      date: formValues.date,
      specialist: formValues.specialist,
      type: formValues.type as Entry["type"],
      diagnosisCodes,
    };

    switch (BaseEntry.type) {
      case "Hospital":
        const newHospitalEntry = {
          ...BaseEntry,
          type: "Hospital" as "Hospital",
          discharge: {
            date: hospitalValues.dischargeDate,
            criteria: hospitalValues.dischargeCriteria,
          },
        };
        await onSubmit(newHospitalEntry);
        break;
      case "OccupationalHealthcare":
        const newOccupationalHealthcareEntry = {
          ...BaseEntry,
          type: "OccupationalHealthcare" as "OccupationalHealthcare",
          employerName: occupationalHealthcareValues.employerName,
          sickLeave: {
            startDate: occupationalHealthcareValues.sickLeaveStartDate,
            endDate: occupationalHealthcareValues.sickLeaveEndDate,
          },
        };
        await onSubmit(newOccupationalHealthcareEntry);
        break;
      case "HealthCheck":
        const newHealthCheckEntry = {
          ...BaseEntry,
          type: "HealthCheck" as "HealthCheck",
          healthCheckRating: Number(healthCheckValues.healthCheckRating),
        };
        await onSubmit(newHealthCheckEntry);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      style={{
        display: `${isOpen ? "block" : "none"}`,
        border: "1px solid black",
        padding: "1em",
      }}
    >
      {error && <Alert severity='error'>{error}</Alert>}
      <form style={{ marginBottom: "8px" }} onSubmit={handleSubmit}>
        <Typography variant='h6'>Add new entry</Typography>
        <FormGroup style={{ marginBottom: "8px" }}>
          <TextField
            id='description'
            label='Description'
            variant='outlined'
            value={formValues.description}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup style={{ marginBottom: "8px" }}>
          <TextField
            id='date'
            variant='outlined'
            label='Date'
            InputLabelProps={{
              shrink: true,
            }}
            type='date'
            value={formValues.date}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup style={{ marginBottom: "8px" }}>
          <TextField
            id='specialist'
            label='Specialist'
            variant='outlined'
            value={formValues.specialist}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup style={{ marginBottom: "8px" }}>
          <TextField
            id='diagnosisCodes'
            label='Diagnostic Codes'
            variant='outlined'
            value={diagnosisCode}
            onChange={(event) => setDiagnosisCode(event.target.value)}
          />
          <Button
            variant='contained'
            onClick={() => {
              setDiagnosisCodes(diagnosisCodes.concat(diagnosisCode));
              setDiagnosisCode("");
            }}
          >
            Add diagnosis code
          </Button>
          <ul>
            {diagnosisCodes.map((code, index) => (
              <li key={index}>{code}</li>
            ))}
          </ul>
        </FormGroup>
        <FormGroup style={{ marginBottom: "8px" }} onChange={handleChange}>
          <Select native id='type'>
            <option value='Hospital'>Hospital</option>
            <option value='OccupationalHealthcare'>
              Occupational Healthcare
            </option>
            <option value='HealthCheck'>Health Check</option>
          </Select>
        </FormGroup>
        <RenderFormDetails
          type={formValues.type}
          hospitalValues={hospitalValues}
          occupationalHealthcareValues={occupationalHealthcareValues}
          healthCheckValues={healthCheckValues}
          handleHospitalChange={handleHospitalChange}
          handleOccupationalHealthcareChange={
            handleOccupationalHealthcareChange
          }
          handleHealthCheckChange={handleHealthCheckChange}
        />
      </form>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant='contained' color='error' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm;
