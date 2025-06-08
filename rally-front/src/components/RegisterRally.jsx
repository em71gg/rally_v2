import { useContext, useEffect, useState } from "react";
import { RallyContext } from "../context/rally.context";

import { UserContext } from "../context/user.context";

import { DateContext } from "../context/date.context";


function RegisterRally(props) {
  const { user } = props;
  const {formatDatetime} = useContext(DateContext);
  const { createRally } = useContext(RallyContext);
  
  const [successfullRegister, setSuccessfullRegister] = useState("");
  
  const [formData, setFormData] = useState({
    category_id: "",
    propietario_id: "", //viene del user.id del dasboar opcional
    
    nombre: "",
    descripcion: "",
    premio1: null, //opcional
    premio2: null, //opcional
    premio3: null, //opcional
    limite_votos: null,
    limite_fotos: null,
    fecha_inicio: "",
    fecha_fin: "",
  });
  useEffect(() => {
    if (user?.id) {
      setFormData(prev => ({ ...prev, propietario_id: user.id }));
    }
  }, [user]);
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
        //!formData.category_id ||
        
        !formData.nombre ||
        !formData.descripcion ||
        !formData.limite_votos ||
        !formData.limite_fotos ||
        !formData.fecha_inicio ||
        !formData.fecha_fin
      ) {
      alert("Rellene los campos obligatorios");
      return;
    }
    console.log('Form data:', formData);
   // props.handleUserInfo(formData);

    const rallyData = {
      category_id: formData.category_id,
      propietario_id: formData.propietario_id, //viene del user.id del dasboar opcional
      
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      premio1: null, //opcional
      premio2: null, //opcional
      premio3: null, //opcional
      limite_votos: formData.limite_votos,
      limite_fotos: formData.limite_fotos,
      fecha_inicio: formatDatetime(formData.fecha_inicio),
      fecha_fin: formatDatetime(formData.fecha_fin),
    }
    createRally(rallyData)
    .then((result) =>{
      console.log('Rally creado', result.data);
      setSuccessfullRegister('El rally ha sido registrado.')
    });
  };

  useEffect(() => {
      if (successfullRegister) {
        const timeout = setTimeout(() => {
          setSuccessfullRegister("");
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }, [successfullRegister]);
  return (
    <div className="register-form" >
      <h2>Registrar Rally</h2>
      <form action="" className="" onSubmit={handleSubmit}>
        <fieldset className="">
          <label htmlFor="category_id" className="role">
            Categoría
          </label>
          <select id="category_id" onChange={handleChange}>
            <option value="">Seleccione una categoría</option>
            <option value="1">Retrato</option>
            <option value="6">Viajes</option>
            <option value="7">Naturaleza</option>
            <option value="8">Moda</option>
            <option value="9">Actualidad</option>
          </select>
        </fieldset>
        <fieldset className="">
          <label htmlFor="nombre" className="register-name">
            Nombre
          </label>
          <input
            type="text"
            className=""
            id="nombre"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="descripcion" className="register-description">
            Descripción
          </label>
          <textarea
            name=""
            id="descripcion"
            className="descripcion"
            rows="4"
            cols="50"
            onChange={handleChange}
          ></textarea>
        </fieldset>
        <input
          type="text"
          className=""
          id="propietario_id"
          value={user.id}
          hidden
        />
        <fieldset className="">
          <label htmlFor="limite_votos" className="register-votos">
            Límite de votos
          </label>
          <input
            type="number"
            max="3"
            className="name"
            id="limite_votos"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="limite_fotos" className="register-fotos">
            Límite de fotos
          </label>
          <input
            type="number"
            max="3"
            className="name"
            id="limite_fotos"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="fecha_inicio" className="fecha">
            Fecha de inicio
          </label>
          <input
            type="datetime-local"
            
            className="fecha"
            id="fecha_inicio"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="fecha_fin" className="fecha">
            Fecha de fin
          </label>
          <input
            type="datetime-local"
            
            className="fecha"
            id="fecha_fin"
            onChange={handleChange}
          />
        </fieldset>
       
        <button type="submit">Registrar Rally</button>
      </form>
      {successfullRegister && (<div className="">{successfullRegister}</div>)}
    </div>
  );
}



export default RegisterRally;
