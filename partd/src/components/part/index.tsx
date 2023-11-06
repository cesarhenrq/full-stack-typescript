import IProps from "./props";

import { assertNever } from "../helpers";

const Part = ({ coursePart }: IProps) => {
  const SpecificDetails = () => {
    switch (coursePart.kind) {
      case "basic":
        return <p style={{ fontStyle: "italic" }}>{coursePart.description}</p>;
      case "group":
        return <p>Project exercises {coursePart.groupProjectCount}</p>;
      case "background":
        return (
          <>
            <p style={{ fontStyle: "italic" }}>{coursePart.description}</p>
            <p>
              See{" "}
              <a href={coursePart.backgroundMaterial}>
                {coursePart.backgroundMaterial}
              </a>
            </p>
          </>
        );
      case "special":
        return (
          <>
            <p style={{ fontStyle: "italic" }}>{coursePart.description}</p>
            <p>Required skills: {coursePart.requirements.join(", ")}</p>
          </>
        );
      default:
        return assertNever(coursePart);
    }
  };

  return (
    <div style={{ borderBottom: "2px solid black" }}>
      <h3>
        {coursePart.name} {coursePart.exerciseCount}
      </h3>
      <SpecificDetails />
    </div>
  );
};

export default Part;
