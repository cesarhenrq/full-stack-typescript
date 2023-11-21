import React from "react";

import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";

import { Entry } from "../../types";

import assertNever from "../../utils/asserNever";

interface Props {
  entry: Entry;
}

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
