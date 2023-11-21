import React from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";

import { HealthCheckRating } from "../types";

import assertNever from "../utils/asserNever";

interface Props {
  rating: HealthCheckRating;
}

const HealthLevelIcon = ({ rating }: Props) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ fill: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ fill: "blue" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ fill: "yellow" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ fill: "red" }} />;
    default:
      return assertNever(rating);
  }
};

export default HealthLevelIcon;
