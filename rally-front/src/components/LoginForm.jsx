import { useContext, useEffect, useState } from "react";
import "./LoginForm.css";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
 
  const navigate = useNavigate();
  const [failedRegister, setFailedRegister] = useState("");
  const {login, user} = useContext(UserContext); 

  useEffect(() => {
      if (user?.isLoggedIn) {
        if(user.role == 'administrador'){
          navigate(`/dashboard`)
        }else{
          navigate(`/user/${user.id}`);
        }
        
        }
      }, [user.isLoggedIn, user.role, user.id, navigate /*user*/]);

   const[formData, setFormData] = useState({
    email:"",
    password: "",
   });
  

  const handleChange = (event) =>{
    const {id, value} = event.target;
    setFormData((prevUser)=>({
      ...prevUser,
      [id]: value,
    }));
  }

  const handleSubmit= (event) => {
    event.preventDefault();
    console.log(user);
    login(formData)
    .then((result) => {
      if(result.success){
        //setUser(result.user); viene del contest de la función login
        //const userId= result.user.id;
        //navigate(`/user/${userId}`);
        //......si resultado del login fue 200 ir redirigia a `/user/${user.id}`
      }
      else{
        console.error('Errores:', result.errors);
        setFailedRegister('Usuario no registrado, por favor introduzca de nuevo unas redenciales válidas');
        setTimeout(() => {
            setFailedRegister("");
        }, 3000);
      }
    })
  }

  
  
  return (
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor='email'>Email</label>
               <input type="email" name="" required="" id='email' onChange={handleChange}/>
            </fieldset>
            <fieldset>
              <label htmlFor="password">Password</label>
              <input type="password" name="" required="" id='password' onChange={handleChange}/>
            </fieldset>
            <button >Login</button>
          </form>
          {failedRegister && <div className="error-message">{failedRegister}</div>}
        </div>
  )
}

export default LoginForm