import React from "react";

import HealthLevelIcon from "../HealthLevelIcon";

import { HealthCheckEntry } from "../../types";

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheckEntryDetails = ({ entry }: Props) => {
  return <HealthLevelIcon rating={entry.healthCheckRating} />;
};

export default HealthCheckEntryDetails;
