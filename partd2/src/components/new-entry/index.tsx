import { useState } from "react";

import { isAxiosError } from "axios";

import diariesService from "../../services/diaries-service";

import NonSensitiveDiaryEntry from "../../interfaces/non-sensitive-diary-entry";

import { weathers, visibilities } from "../../helpers";

interface NewEntryProps {
  setEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}

const NewEntry = ({ setEntries }: NewEntryProps) => {
  const [error, setError] = useState<string | null>(null);

  const [formValues, setFormValues] = useState({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });

  const resetForm = () => {
    setFormValues({
      date: "",
      visibility: "",
      weather: "",
      comment: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("formValues", formValues);

    const newEntry = {
      date: formValues.date,
      visibility: formValues.visibility,
      weather: formValues.weather,
      comment: formValues.comment,
    };

    try {
      const response = await diariesService.create(newEntry);
      setEntries((prev) => [...prev, response.data]);
      resetForm();
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data || "Unknown Error");
      } else {
        setError("Unknown Error");
      }
    }

    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ color: "red" }}>{error}</div>
      <h2>Add new entry</h2>
      <label>
        Date
        <input
          type='date'
          name='date'
          value={formValues.date}
          onChange={handleChange}
        />
      </label>
      <br />
      <div>
        Visibility
        {visibilities.map((visibility) => (
          <label key={visibility}>
            <input
              type='radio'
              name='visibility'
              value={visibility}
              onChange={handleChange}
              checked={formValues.visibility === visibility}
            />
            {visibility}
          </label>
        ))}
      </div>
      <br />
      <div>
        Weather
        {weathers.map((weather) => (
          <label key={weather}>
            <input
              type='radio'
              name='weather'
              value={weather}
              onChange={handleChange}
              checked={formValues.weather === weather}
            />
            {weather}
          </label>
        ))}
      </div>
      <br />
      <label>
        Comment
        <input
          type='text'
          name='comment'
          value={formValues.comment}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type='submit'>add</button>
    </form>
  );
};

export default NewEntry;
