import { useContext, useEffect, useState } from "react";
import "./RegisterForm.css";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router";

function RegisterForm(props) {
  const {register} = useContext(UserContext);
  const navigate = useNavigate();
  const [successfullRegister, setSuccessfullRegister] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    surname: "",
    nickname: "",
    role: "",
  });

  const { password, password_confirmation } = formData;
  const [psswMatch, setPsswMatch] = useState(true);
  useEffect(() => {
    setPsswMatch(password === password_confirmation);
  }, [password, password_confirmation]);

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
      !psswMatch ||
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.password_confirmation
    ) {
      alert("Rellene los campos obligatorios");
      return;
    }

    
    props.handleUserInfo(formData);

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      surname: formData.surname,
      nickname: formData.nickname,
      role: formData.role,
    };

    register(userData)
    .then((result) =>{
      if(result.success){
        console.log('usuario registrado', result.data);
        setSuccessfullRegister('Ha sido registrado como usuario, será redirigido a Login.')
        setTimeout(() => {
             navigate('/login');
        }, 2000);
      }else{
        console.error('Errores:', result.errors);
      }
    });

  };

  return (
    <div className="register-box">
      <h2>Registro</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <fieldset className="">
          <label htmlFor="name" className="register-name">
            Nombre
          </label>
          <input
            type="text"
            className="name"
            id="name"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="surname" className="register-surname">
            surname
          </label>
          <input
            type="text"
            className="surname"
            id="surname"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="nickname" className="nickname">
            Nick name
          </label>
          <input
            type="text"
            className="nickname"
            id="nickname"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="role" className="role">
            Role
          </label>
          <select id="role" onChange={handleChange}>
            <option value="">Seleccione un rol</option>
            <option value="administrador">Administrador</option>
            <option value="gestor">Gestor</option>
            <option value="creador">Creador</option>
            <option value="participante">Participante</option>
          </select>
        </fieldset>
        <fieldset className="">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            className="password"
            id="password"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="">
          <label htmlFor="password_confirmation">Confirmar Contraseña</label>
          <input
            type="password"
            className={`password_confirmation ${!psswMatch ? "pssErrorBorder" : ""}`}
            id="password_confirmation"
            onChange={handleChange}
          />
          <div className="input-error">
            {psswMatch ? "" : "Error: Passwords do not match"}
          </div>
        </fieldset>
        <button type="submit">Registrarse</button>
      </form>
     {successfullRegister && <div className="">{successfullRegister}</div>}
    </div>
  );
}



export default RegisterForm;
