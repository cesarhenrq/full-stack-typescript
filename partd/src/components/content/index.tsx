import Part from "../part";

import IProps from "./props";

const Content = ({ courseParts }: IProps) => {
  return (
    <>
      {courseParts.map((part, index) => (
        <Part coursePart={part} key={index} />
      ))}
    </>
  );
};

export default Content;
