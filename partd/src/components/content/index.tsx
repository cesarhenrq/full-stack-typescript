import IProps from "./props";

const Content = ({ courseParts }: IProps) => {
  return (
    <>
      {courseParts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
