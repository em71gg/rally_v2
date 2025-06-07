import { useContext, useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import '../components/RegisterForm';
import RegisterForm from '../components/RegisterForm';
import { HeaderContext } from '../context/header.context';

function Register() {
  const {greetings, links} = useContext(HeaderContext);

  const handleUserInfo = (userData) =>{
    console.log('Info del usuario registrado: ', userData);
  }
  
  return (
    <>
    <HeaderComponent greetings={greetings} links={links}/>
    <RegisterForm handleUserInfo={handleUserInfo} />
    </>
  )
}

export default Register