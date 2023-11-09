import { useState } from "react";

import Entries from "./components/entries";
import NewEntry from "./components/new-entry";

import NonSensitiveDiaryEntry from "./interfaces/non-sensitive-diary-entry";

function App() {
  const [entries, setEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  return (
    <div>
      <NewEntry {...{ setEntries }} />
      <Entries {...{ entries, setEntries }} />
    </div>
  );
}

export default App;
