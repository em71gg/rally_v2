import { useContext } from "react";
import { RallyContext } from "../context/rally.context";
import RallyCardToBe from "./RallyCardToBe";

function RalliesToValidate() {
  const { rallies, validateRally } = useContext(RallyContext);

  const ralliesToValidate = rallies
    .filter((rally) => rally.validado === 0)
    .map((rally) => (
      <li className="rallies-list" key={rally.id}>
        <div className="">
          <RallyCardToBe rally={rally} />
          <button
            className=""
            onClick={() => validateRally(rally.id)}
          >
            Validar rally
          </button>
        </div>
      </li>
    ));

  return <ul>{ralliesToValidate}</ul>;
}

export default RalliesToValidate;
