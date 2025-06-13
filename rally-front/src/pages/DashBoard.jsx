import React, { useContext, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { UserContext } from "../context/user.context";
import { HeaderContext } from "../context/header.context";
import "./DashBoard.css";
import RegisterRally from "../components/RegisterRally";
import { RallyContext } from "../context/rally.context";
import RallyCardToBe from "../components/RallyCardToBe";
import RalliesToValidate from "../components/RalliesToValidate";
import RalliesCanBeDeleted from "../components/RalliesCanBeDeleted";

//const validate = () =>{};

function DashBoard(props) {
  const { user } = useContext(UserContext);
  const { links } = useContext(HeaderContext);
  const [openRegisterRally, setOpenRegisterRally] = useState(false);
  const [openValidateRally, setOpenValidateRally] = useState(false);
  const [openDeleteRally, setOpenDeleteRally] = useState(false);
  const greetings = "Dashboard";
  const handleOpenRegister = () => {
    setOpenRegisterRally(!openRegisterRally);
  };
  const handleOpenValidate = () => {
    setOpenValidateRally(!openValidateRally);
  };
  const handleOpenDeleteRally = () => {
    setOpenDeleteRally(!openDeleteRally);
  }


  return (
    <>
      <HeaderComponent greetings={greetings} links={links} />
      <h6>
        Usuario: {user.name} id:{user.id}
      </h6>
      <main className="">
        <div>
          <h3 className="">Alta Rally</h3>
          <button className="" onClick={handleOpenRegister}>
            Registrar Nuevo Rally
          </button>
          {openRegisterRally && (
            <div className="">
              <RegisterRally
                user={user}
                handleOpenRegister={handleOpenRegister}
              />
            </div>
          )}
        </div>
        <div>
          <h3 className="">Validar rallies</h3>
          <p className="">
            Hay {/*Insertar la funcion que calcule esto*/} rallies por validar
          </p>
          <button className="" onClick={handleOpenValidate}>
            Ver Rallies por Validar
          </button>
          {openValidateRally && (
            <div className="">
              <RalliesToValidate handleOpenValidate={openValidateRally}/>
            </div>
          )}
        </div>
        <div>
          <h3 className="">Eliminar Rallies</h3>
          <button className="" onClick={handleOpenDeleteRally}>Ver Rallies Eliminables</button>
          {openDeleteRally && (
            <div className="">
                <RalliesCanBeDeleted handleOpenDeleteRally={handleOpenDeleteRally}/>
            </div>
          )}
          
        </div>
        <div>usuarios</div>
      </main>
    </>
  );
}

export default DashBoard;
