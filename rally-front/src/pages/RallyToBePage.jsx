import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { RallyContext } from "../context/rally.context";
import { HeaderContext } from "../context/header.context";
import { UserContext } from "../context/user.context";
import HeaderComponent from "../components/HeaderComponent";
import DisplayRallyInfoToParticipant from "../components/DisplayRallyInfoToParticipant";

function RallyToBePage(props) {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const { rallies, registerParticipantOnRally, registered, setRegistered } =
    useContext(RallyContext);
  const { links, greetings } = useContext(HeaderContext);
  //limpia set registered pa ra que no haya error en la carga de la página
  useEffect(() => {
    return () => {
      setRegistered(false);
    };
  }, []);

  const actualRally = rallies.find((rally) => rally.id === parseInt(id)); //useParams siempre devuelve un string, por eso parseInt(id)
  console.log("El Rally es :", actualRally, " Elusuario es:", user.id);
  if (!actualRally) {
    console.log("No existe el rally");
    return <Navigate to={"/error"} />;
  }

  if (!user.isLoggedIn) return <Navigate to={"/login"} />;
  console.log(
    `El valor de isLoggedin es: ${user.isLoggedIn}, y el de name: ${user.name}`
  );

  return (
    <>
      <HeaderComponent greetings={greetings} links={links} />
      <main className="">
        <section className="">
          <h2 className="">Hola {user.name}</h2>
        </section>
        <section className="">
          <h2 className="">
            Despliegue del rally con id {id} y nombre {actualRally.nombre}
          </h2>
        </section>
        <section className="" id="container">
          <DisplayRallyInfoToParticipant
            rally={actualRally}
          ></DisplayRallyInfoToParticipant>
        </section>
        <section className="">
          <button
            onClick={() => registerParticipantOnRally(actualRally.id, user.id)}
          >
            Registrarse
          </button>
          {registered && (
            <>
              <p className="">Registrado en el Rally {actualRally.nombre}</p>{" "}
              <Link to={`/user/${user.id}`}>Ir a pagina personal</Link>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default RallyToBePage;
