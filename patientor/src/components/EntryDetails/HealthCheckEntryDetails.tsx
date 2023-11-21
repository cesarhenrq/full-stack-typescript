import React from "react";

import { Typography } from "@mui/material";

import HealthLevelIcon from "../HealthLevelIcon";

import { HealthCheckEntry } from "../../types";

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheckEntryDetails = ({ entry }: Props) => {
  return (
    <Typography style={{ display: "flex", alignItems: "center", gap: " 4px" }}>
      Health rating: <HealthLevelIcon rating={entry.healthCheckRating} />
    </Typography>
  );
};

export default HealthCheckEntryDetails;
