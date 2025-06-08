import { useContext, useState } from "react";
import { DateContext } from "../context/date.context";
import { Link } from "react-router-dom";
import { PhotoContext } from "../context/photo.context";
import DragAndDrop from "./DragAndDrop";
import { UserContext } from "../context/user.context";

function RallyUserCard(props) {
  const { rally } = props;
  const { user } = useContext(UserContext); //de aqui sacamos user_id para el upload user.id
  const { formatDate } = useContext(DateContext, PhotoContext);
  const {uploadPhoto, registerPhoto} = useContext(PhotoContext);
  const [displayDragAndDrop, setDisplayDragAndDrop] = useState(false);
  const [name, setName] = useState("")
  const [file, setFile] = useState([]);

  const now = new Date();
  const startDate = new Date(rally.fecha_inicio);
  const endDate = new Date(rally.fecha_fin);
  const handleUpload = async (event) => {
    event.preventDefault();

    if(!file.length || !name) {
      alert('Debes seleccionar una imagen y escribir un título para la misma.')
      return;
    }

    try {
      //crear foto y almacenar imagen.
      const postPhoto = await uploadPhoto({
        user_id: user.id,
        nombre: name,
        image_file: file[0],
      });

      //Registrar foto en rally
      await registerPhoto({
        rally_id: rally.id,
        foto_id: postPhoto.id,
      });

      alert('Foto creada y registrada correctamente');
      handleCancel= () => {
        setFile([]);
      setName("");
      setDisplayDragAndDrop(false);
      };//limpia el formulario.
    }catch(error){
      console.error("Error al subir o registrar la foto:", error);
      alert('Ocurrió un error. Info por consola');
    };

    
    
    

  };


  let rallyStatus;

  if (startDate > now) {
    rallyStatus = (
      <>
        <p>Fecha prevista de inicio: {formatDate(startDate)}.</p>
        <p>Cierre del Rally: {formatDate(endDate)}.</p>
      </>
    );
  } else if (endDate >= now) {
    rallyStatus = <p>Cierre del Rally: {formatDate(endDate)}.</p>;
  } else {
    rallyStatus = <p>Rally finalizado: {formatDate(endDate)}.</p>;
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
            <label htmlFor="new-photo" className="">
              Inscribir foto nueva.
            </label>
            <button
              className=""
              id="new-photo"
              onClick={() => setDisplayDragAndDrop(true)}
            >
              Inscribir
            </button>
          </div>
          <div className="">
            <label htmlFor="uploaded-photo" className="">
              Inscribir foto existente.
            </label>
            <button className="" id="uploade-photo">
              Inscribir
            </button>
          </div>
          <div className="">
            {displayDragAndDrop && (
              <form onSubmit={handleUpload}>
                <DragAndDrop
                  rally_id={rally.id}
                  onSuccess={() => setDisplayDragAndDrop(false)}
                  name={name}
                  setName={setName}
                  file={file} 
                  setFile={setFile}
                />
                <button type="submit">Enviar</button>
              </form>
            )}
          </div>
        </section>
        <section className="remove-photos">
          <div className="">
            <label htmlFor="remove-photo" className="">
              Eliminar foto del rally.
            </label>
            <button
              className=""
              id="new-photo"
              onClick={() => setDisplayDragAndDrop(true)}
            >
              Eliminar
            </button>
          </div>
        </section>
      </section>

      <Link to={`/sign-rally/${rally.id}`}>Ir a {rally.nombre}</Link>
      {/**ESto debe variarse para ir a la página real */}
    </div>
  );
}

export default RallyUserCard;
