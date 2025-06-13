import React, { useContext, useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import { HeaderContext } from '../context/header.context';
import DragAndDrop from '../components/DragAndDrop';
import { RallyContext } from '../context/rally.context';
import RallyUserCard from '../components/RallyUserCard';

function UserPage() {
    const {user} = useContext(UserContext);
    const {greetings, links} = useContext(HeaderContext);
    const {rallies} = useContext(RallyContext);

    const participatingRallies = rallies
    .filter((rally) =>
      rally.participantes.some(participante => participante.id === user.id)
      /**
       * Usa .some() para recorrer el array rally.participantes
       * .some() devuelve true si al menos un participante tiene id === user.id.
       * Entonces filter sí incluye ese rally en el resultado si el usuario está participando.
       */
  )
    .map((rally) =>{
      return(
        <li className="" key={rally.id}>
          <RallyUserCard rally={rally} />
        </li>
      )
      
    });

    console.log('Usuario en UserPage', user);
    console.log(rallies);
    if(!user.id) return <Navigate to={'/error'} />;
    
    const login = (userInfo) => {
        console.log(userInfo);
       // setUser(userInfo)
    }
  return (
    <>
        <HeaderComponent greetings={greetings} links={links} />

        {user.name && <h2>Hola {user.name}</h2>}
        <section className="">
          <div className="">
            <h2 className="">Listado de rallies inscritos, quizas puedo quitarlo</h2>

          </div>
        </section>
        {/*listar rallies apuntados y mandos para subir o bajar fotos*/}
        <section className="">
          <h2 className="">Rallies en los que participo.</h2>
            <ul className="">
              {participatingRallies}
            </ul>
        </section>
        {/*listar fotos en sistema apuntados*/}

        
    </>
    
  )
}

export default UserPage