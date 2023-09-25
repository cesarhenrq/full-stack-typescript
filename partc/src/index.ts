import express, { Express } from "express";

import diagnosisRouter from "./routes/diagnosis.route";
import patientsRouter from "./routes/patients.route";

import cors from "cors";

const app: Express = express();

app.use(cors());

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnosis", diagnosisRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
