import NonSensitiveDiaryEntry from "../../../interfaces/non-sensitive-diary-entry";

const Entry = ({ date, visibility, weather }: NonSensitiveDiaryEntry) => {
  return (
    <div>
      <h2>{date}</h2>
      <p>Visibility: {visibility}</p>
      <p>Weather: {weather}</p>
    </div>
  );
};

export default Entry;
