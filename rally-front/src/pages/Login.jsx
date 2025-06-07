
import { Link, useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent'
import LoginForm from '../components/LoginForm'
import { useContext, useEffect } from "react";
import { HeaderContext } from '../context/header.context';
import { UserContext } from '../context/user.context';

function Login() {
  console.log("Render Login");
    const navigate = useNavigate;
    const {greetings, links} = useContext(HeaderContext);
    const {user, setUser} = useContext(UserContext);
    
  return (
    <>
    {/*<HeaderComponent greetings={greetings} links={links}/>*/}
    <LoginForm /> 
    </>
  )
}

export default Login