const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  switch (true) {
    case bmi < 18.5:
      return "Underweight";
    case bmi < 25:
      return "Normal (healthy weight)";
    case bmi < 30:
      return "Overweight";
    default:
      return "Obese";
  }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight));

export default calculateBmi;
