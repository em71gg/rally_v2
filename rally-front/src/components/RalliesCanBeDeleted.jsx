import { useContext, useEffect, useState } from "react";
import { RallyContext } from "../context/rally.context";
import RallyCardToBe from "./RallyCardToBe";



function RalliesCanBeDeleted(props) {
    const { rallies, deleteRally } = useContext(RallyContext);
    const [deleted, setDeleted] = useState(false);
    const {handleOpenDeleteRally} = props;
    const [deletionState, setDeletionState] = useState('');
    console.log('Esto devuelve rallies: ', rallies);

    const dropRally = (rally_id) =>{
      //event.preventDefault();
      deleteRally(rally_id).then((result) =>{
        if(result.success) {
          setDeletionState('Rally eliminado.')
        }
        else{
          setDeletionState('Error al eliminar el rally.');
        }
      })
    };
    useEffect(()=>{
      if(deletionState){
        const timeout = setTimeout(() =>{
          setDeletionState(''),
          handleOpenDeleteRally(false);
        }, 3000);
        return () => clearTimeout();
      }
    }, [deletionState])
     
  
    const ralliesToDelete = rallies
    .filter((rally) => rally.fotos_count==0)
    .map((rally) => (
      <li className="rallies-list" key={rally.id}>
        <div className="">
          <RallyCardToBe rally={rally} />
          <button
            className=""
            onClick={() => dropRally(rally.id)}
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