import React from "react";

import { Box, Typography } from "@mui/material";

import { HospitalEntry } from "../../types";

interface Props {
  entry: HospitalEntry;
}

const HospitalEntryDetails = ({ entry }: Props) => {
  return (
    <Box>
      <Typography>Discharge: {entry.date}</Typography>
      <Typography>Criteria: {entry.discharge.criteria}</Typography>
    </Box>
  );
};

export default HospitalEntryDetails;
