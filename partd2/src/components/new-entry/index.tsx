import { useState } from "react";

import { isAxiosError } from "axios";

import diariesService from "../../services/diaries-service";

import NonSensitiveDiaryEntry from "../../interfaces/non-sensitive-diary-entry";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEntry = {
      date: formValues.date,
      visibility: formValues.visibility,
      weather: formValues.weather,
      comment: formValues.comment,
    };

    try {
      const response = await diariesService.create(newEntry);
      setEntries((prev) => [...prev, response.data]);
      setFormValues({
        date: "",
        visibility: "",
        weather: "",
        comment: "",
      });
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
      <label>
        Visibility
        <input
          type='text'
          name='visibility'
          value={formValues.visibility}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Weather
        <input
          type='text'
          name='weather'
          value={formValues.weather}
          onChange={handleChange}
        />
      </label>
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
