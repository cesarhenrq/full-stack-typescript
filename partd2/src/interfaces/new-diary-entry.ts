import DiaryEntry from "./diary-entry";

type NewDiaryEntry = Omit<DiaryEntry, "id">;

export default NewDiaryEntry;
