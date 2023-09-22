const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("Target must be a number");

  const dailyExerciseHours = args.slice(3).map((h) => Number(h));

  if (dailyExerciseHours.some((h) => isNaN(h)))
    throw new Error("Daily exercise hours must be numbers");

  return [target, ...dailyExerciseHours];
};

export default parseArguments;
