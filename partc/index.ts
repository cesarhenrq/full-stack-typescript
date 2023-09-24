import express, { Express } from "express";

import cors from "cors";

const app: Express = express();

app.use(cors());

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
