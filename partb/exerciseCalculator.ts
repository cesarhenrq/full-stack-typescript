import parseArguments from "./utils/parseArguments";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((h) => h > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average >= target * 0.8 ? 2 : 1;
  const ratingDescription = success
    ? "good"
    : average >= target * 0.8
    ? "not too bad but could be better"
    : "bad";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const [target, ...dailyExerciseHours] = parseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log("Error, something bad happened, message: ", e.message);
  } else {
    throw e;
  }
}
