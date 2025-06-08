import { useContext } from "react";
import { RallyContext } from "../context/rally.context";
import RallyCardToBe from "./RallyCardToBe";


function RalliesCanBeDeleted() {
    const { rallies, deleteRally } = useContext(RallyContext);
    console.log('Esto devuelve rallies: ', rallies);
    const ralliesToDelete = rallies
    .filter((rally) => rally.fotos_count === 0)
    .map((rally) => (
      <li className="rallies-list" key={rally.id}>
        <div className="">
          <RallyCardToBe rally={rally} />
          <button
            className=""
            onClick={() => deleteRally(rally.id)}
          >
            Eliminar rally
          </button>
        </div>
      </li>
    ));
  return (
    <ul className="">{ralliesToDelete}</ul>
  )
}

export default RalliesCanBeDeleted