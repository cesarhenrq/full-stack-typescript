import React from "react";

import { Entry } from "../types";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import HealingIcon from "@mui/icons-material/Healing";

import assertNever from "../utils/asserNever";

interface Props {
  type: Entry["type"];
}

const EntryIcon = ({ type }: Props) => {
  switch (type) {
    case "HealthCheck":
      return <MonitorHeartIcon />;
    case "OccupationalHealthcare":
      return <HealingIcon />;
    case "Hospital":
      return <LocalHospitalIcon />;
    default:
      return assertNever(type);
  }
};

export default EntryIcon;
