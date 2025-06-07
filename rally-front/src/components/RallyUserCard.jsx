import { useContext, useState } from "react";
import { DateContext } from "../context/date.context";
import { Link } from "react-router-dom";
import { PhotoContext } from "../context/photo.context";
import DragAndDrop from "./DragAndDrop";

function RallyUserCard(props) {
  const { rally } = props;
  const { formatDate,  } = useContext(DateContext, PhotoContext);
  const [displayDragAndDrop, setDisplayDragAndDrop] = useState(false);

  const now = new Date();
  const startDate = new Date(rally.fecha_inicio);
  const endDate = new Date(rally.fecha_fin);

  let rallyStatus;

  if (startDate > now) {
    rallyStatus = (
      <>
        <p>Fecha prevista de inicio: {formatDate(startDate)}.</p>
        <p>Cierre del Rally: {formatDate(endDate)}.</p>
      </>
    );
  } else if (endDate >= now) {
    rallyStatus = <p>Cierre del Rally: {formatDate(endDate)}.</p>
  } else {
    rallyStatus = <p>Rally finalizado: {formatDate(endDate)}.</p>
  }

  return (
    <div className="">
      <h3 className="title">{rally.nombre}</h3>
      <p>Rally id: {rally.id}</p>
      <p className="">Categoria : {rally.category.categoria}</p>
      <p className="">{rally.descripcion}</p>
      {rallyStatus}
      <section className="managing-photos">
        <section className="upload-photos">
          <div className="">
            <label htmlFor="new-photo" className="">Inscribir foto nueva.</label>
            <button className="" id="new-photo" onClick={()=>setDisplayDragAndDrop(true)}>Inscribir</button>
          </div>
          <div className="">
            <label htmlFor="uploaded-photo" className="" >Inscribir foto existente.</label>
            <button className="" id="uploade-photo" >Inscribir</button>
          </div>
          <div className="">
            {displayDragAndDrop && (<DragAndDrop rally_id={rally.id} onSuccess={() => setDisplayDragAndDrop(false)} /> )}
          </div>
        </section>
        <section className="remove-photos">
          <div className="">
            <label htmlFor="remove-photo" className="">Eliminar foto del rally.</label>
              <button className="" id="new-photo" onClick={()=>setDisplayDragAndDrop(true)}>Eliminar</button>
            </div>
        </section>
        
      </section>
      
      <Link to={`/sign-rally/${rally.id}`}>Ir a {rally.nombre}</Link>{/**ESto debe variarse para ir a la página real */}
    </div>
  );
}

export default RallyUserCard;
