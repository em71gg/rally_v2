import { useContext } from "react";
import { Link } from "react-router-dom";
import { DateContext } from "../context/date.context";

function RallyCard(props) {
  const { rally } = props;
  const {formatDate} =useContext(DateContext);
  return (
    <div className="">
      <h3 className="title">{rally.nombre}</h3>
      <p className="">Categoria : {rally.category.nombre}</p>
      <p className="">{rally.descripcion}</p>
      <p className="">
        Abierto hasta: {formatDate(rally.fecha_fin)}.
      </p>
      <Link to={`/rally/${rally.id}`}>Ir a {rally.nombre}</Link>
    </div>
  );
}

export default RallyCard;
