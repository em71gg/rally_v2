import { useContext } from "react"
import { DateContext } from "../context/date.context"


function DisplayRallyInfoToParticipant(props) {
    const {formatDate} = useContext(DateContext);
  return (
    <div>
        <h3>{props.rally.nombre}</h3>
      <p><strong>Descripcion:</strong> {props.rally.descripcion}</p>
      <p><strong>Categoria:</strong> {props.rally.category.nombre}</p>
      {(props.rally.limite_fotos) &&
      <p><strong>Limite de fotos:</strong> {props.rally.limite_fotos}</p>}
      {(props.rally.premio1) && <p><strong>Primer Premio:</strong> {props.rally.premio1}</p>}
      {(props.rally.premio2) && <p><strong>Segundo Premio:</strong> {props.rally.premio2}</p>}
      {(props.rally.premio3) && <p><strong>Tercer Premio:</strong> {props.rally.premio3}</p>}
      <p><strong>Inicio:</strong> {formatDate(props.rally.fecha_inicio)}</p>
      <p><strong>Fin:</strong> {formatDate(props.rally.fecha_fin)}</p>
    </div>
  )
}

export default DisplayRallyInfoToParticipant