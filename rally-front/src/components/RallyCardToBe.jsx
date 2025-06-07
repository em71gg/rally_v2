import { useContext } from "react";
import { Link } from "react-router-dom";
import { DateContext } from "../context/date.context";


function RallyCardToBe(props) {
    const {rally} = props;
    const {formatDate} = useContext(DateContext);
  return (
     <div className="">
      <h3 className="title">{rally.nombre}</h3>
      <p className="">Categoria : {rally.category.nombre}</p>
      <p className="">{rally.descripcion}</p>
      <p className="">
        Fecha prevista de inicio: {formatDate(rally.fecha_inicio)}.
      </p>
      <Link to={`/sign-rally/${rally.id}`}>Ir a {rally.nombre}</Link>
    </div>
  )
}

export default RallyCardToBe