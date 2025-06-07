import { useContext, useEffect, useRef, useState } from "react";
import "./DragAndDrop.css"; // o usa Tailwind para estilos rápidos
import { UserContext } from "../context/user.context";
import { PhotoContext } from "../context/photo.context";

function DragAndDrop(props) {

  useEffect(() =>{
    //pendiente de lógica de carga de datos del rally_id del Numero de fotos5
  }, []);
  const {rally_id, onSuccess } = props;
  const {user} = useContext(UserContext);//de aqui sacamos user_id para el upload user.id
  const {uploadPhoto, registerPhoto} = useContext(PhotoContext);
  const [file, setFile] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef();
  const [name, setName] = useState("")

  const setPhotoName = (event) => {
    
    setName(event.target.value); 
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files;
    setFile(Array.from(droppedFile));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files;
    setFile(Array.from(selectedFile));
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if(!file.length || !name) {
      alert('Debes seleccionar una imagen y escribir un título para la misma.')
      return;
    }

    try {
      //crear foto y almacenar imagen.
      const getPhotoId = await uploadPhoto({
        user_id: user.id,
        nombre: name,
        file: file[0],
      });
    }catch(error){
      alert('Ocurrió un error. Info por consola');
    };

    //Registrar foto en rally
    await registerPhoto({
      rally_id: rally_id,
      foto_id: getPhotoId,
    });

    alert('Foto creada y registrada correctamente');
    handleCancel();//limpia el formulario.
    onSuccess?.();//uso el prop que setea displayDragAndDrop a false.
    /*
    const formData = new FormData();
    formData.append("name", name);
    (file.length >0) && (formData.append('file', file[0]))
    for (let [key, value] of formData.entries()) {
      console.log('Uploading.... ',`${key}:`, value);
    }
    console.log("Uploading...", formData);
    */

  };

  const handleCancel = () => {
    setFile([]);
    inputRef.current.value = null;
  };

  return (
   <section className="photo-data">
    <h2 className="">Subir foto</h2>
    <form action="" className="" onSubmit={handleUpload}>
      <div className="photodata">
        <label htmlFor="photo-name" className="photo-name">Título de la foto</label>
        <input type="text" className="photo-name" id="photo-name" onChange={setPhotoName}/>
      </div>
      <div className="container">
        {file.length > 0 ? (
          <div className="upload-box">
            <ul>
              {file.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
            <div className="actions">
              <button className="btn cancel" onClick={handleCancel}>Cancelar</button>
              {/*<button className="btn upload" onClick={handleUpload}>Subir</button>*/}
            </div>
          </div>
        ) : (
          <div
            className={`dropzone ${isDragging ? "dragging" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p>Suelta tu archivo aquí</p>
            <p>o</p>
            <input
              type="file"
              ref={inputRef}
              hidden
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <button onClick={() => inputRef.current.click()}>Seleccionar archivo</button>
          </div>
        )}
      </div>
      <button type="submit">Enviar foto</button>
    </form>
    
   </section>
    
  );
}

export default DragAndDrop;

