import express from "express";

import calculateBmi from "./bmiCalculator";

import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    res.status(400).json({ error: "malformatted parameters" });

    return;
  }

  const bmi = calculateBmi(height, weight);

  res.json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    res.status(400).json({ error: "parameters missing" });

    return;
  }

  console.log(
    "dailyExercises.every((x) => !isNaN(Number(x)))",
    (dailyExercises as []).every((x) => !isNaN(Number(x)))
  );

  const isDailyExercisesArray = Array.isArray(dailyExercises);
  const isDailyExercisesArrayNumber =
    isDailyExercisesArray && dailyExercises.every((x) => !isNaN(Number(x)));

  const isTargetNumber = !isNaN(Number(target));

  const isParametersValid = isDailyExercisesArrayNumber && isTargetNumber;

  if (!isParametersValid) {
    res.status(400).json({ error: "malformatted parameters" });

    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(dailyExercises, target);

  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
