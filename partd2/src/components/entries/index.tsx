import { useEffect } from "react";

import Entry from "./entry";

import diariesService from "../../services/diaries-service";

import NonSensitiveDiaryEntry from "../../interfaces/non-sensitive-diary-entry";

interface EntriesProps {
  entries: NonSensitiveDiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}

const Entries = ({ entries, setEntries }: EntriesProps) => {
  useEffect(() => {
    const fetchEntries = async () => {
      const response = await diariesService.getAll();
      setEntries(response.data);
    };

    fetchEntries();
  }, [setEntries]);

  return (
    <div>
      <h2>Diary entries</h2>
      {entries.map((entry) => (
        <Entry key={entry.id} {...entry} />
      ))}
    </div>
  );
};

export default Entries;
