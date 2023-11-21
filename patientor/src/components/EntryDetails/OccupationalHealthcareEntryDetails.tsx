import React from "react";

import { Box, Typography } from "@mui/material";

import { OccupationalHealthcareEntry } from "../../types";

interface Props {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryDetails = ({ entry }: Props) => {
  return (
    <Box>
      <Typography>Employer: {entry.employerName}</Typography>
      <Typography>
        Sick leave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
      </Typography>
    </Box>
  );
};

export default OccupationalHealthcareEntryDetails;
