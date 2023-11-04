interface ICoursePart {
  name: string;
  exerciseCount: number;
}

export default interface IProps {
  courseParts: Array<ICoursePart>;
}
