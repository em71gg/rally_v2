import { useContext, useEffect, useState } from "react";
import { RallyContext } from "../context/rally.context";
import RallyCardToBe from "./RallyCardToBe";

function RalliesToValidate(props) {
  const { handleOpenValidate } = props;
  const { rallies, validateRally } = useContext(RallyContext);
  const [validationState, setValidationState] = useState("");

  const handleValidate = (rally_id) => {
    validateRally(rally_id).then((result) => {
      if (result.success) {
        setValidationState("Rally validado.");
      } else {
        setValidationState("Error al validar el rally.");
      }
    });
  };

  useEffect(() => {
    if (validationState) {
      const timeout = setTimeout(() => {
        setValidationState("");
        handleOpenValidate(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [validationState]);
  const ralliesToValidate = rallies
    .filter((rally) => rally.validado === 0)
    .map((rally) => (
      <li className="rallies-list" key={rally.id}>
        <div className="">
          <RallyCardToBe rally={rally} />
          <button className="" onClick={() => handleValidate(rally.id)}>
            Validar rally
          </button>
        </div>
        
      </li>
      
    ));

  return (

    <>
    {validationState && (<div className="">{validationState}</div>)}
    <ul>{ralliesToValidate}</ul>
    </>
  )
  
  
}

export default RalliesToValidate;
