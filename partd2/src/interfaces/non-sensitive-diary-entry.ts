import DiaryEntry from "./diary-entry";

type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export default NonSensitiveDiaryEntry;
