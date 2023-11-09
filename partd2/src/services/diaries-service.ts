import axios from "axios";

import DiaryEntry from "../interfaces/diary-entry";
import NonSensitiveDiaryEntry from "../interfaces/non-sensitive-diary-entry";
import NewDiaryEntry from "../interfaces/new-diary-entry";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
  return axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
};

const create = (entry: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(baseUrl, entry);
};

const diariesService = {
  getAll,
  create,
};

export default diariesService;
