import React from "react";

import { Box, Typography } from "@mui/material";

import EntryDetails from "./EntryDetails";

import EntryIcon from "./EntryIcon";

import { Entry, Diagnosis } from "../types";

interface Props {
  entry: Entry;
  diagnoses?: Diagnosis[];
}

const BaseEntry = ({ entry, diagnoses }: Props) => {
  return (
    <Box
      style={{
        border: "1px solid black",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <Typography style={{ display: "flex", alignItems: "center" }}>
        <EntryIcon type={entry.type} />
        <strong style={{ marginRight: "8px", marginLeft: "8px" }}>
          {entry.date}
        </strong>
        {entry.description}
      </Typography>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li>
            <Typography key={code}>
              {code}{" "}
              {diagnoses?.find((diagnosis) => diagnosis.code === code)?.name}
            </Typography>
          </li>
        ))}
      </ul>
      <EntryDetails entry={entry} />
      <Typography>
        <strong>Specialist:</strong> {entry.specialist}
      </Typography>
    </Box>
  );
};

export default BaseEntry;
