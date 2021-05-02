import * as React from "react";
import { PlanetApi } from "../../management/interface";
import "./result.scss";

interface ResultProps {
  results: PlanetApi[];
}
const Result: React.FC<ResultProps> = (props: ResultProps) => {
  if (props.results === null) {
    return null;
  }
  return (
    <div className="result-container">
      {props.results.map((planet) => {
        return <div className="planet-name">{planet.name}</div>;
      })}
    </div>
  );
};

export default Result;
