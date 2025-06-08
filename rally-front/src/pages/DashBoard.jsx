import React, { useContext } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { UserContext } from "../context/user.context";
import { HeaderContext } from "../context/header.context";
import "./DashBoard.css";
import RegisterRally from "../components/RegisterRally";
import { RallyContext } from "../context/rally.context";
import RallyCardToBe from "../components/RallyCardToBe";
import RalliesToValidate from "../components/RalliesToValidate";
import RalliesCanBeDeleted from "../components/RalliesCanBeDeleted";

const validate = () =>{};

function DashBoard() {
  const { user } = useContext(UserContext);
  const { links } = useContext(HeaderContext);
  const greetings = "Dashboard";
 

  
  
  return (
    <>
      <HeaderComponent greetings={greetings} links={links} />
      <main className="">
        <div>
          <h3 className="">Alta Rally</h3>
          <h2>{user.id}</h2>
          <RegisterRally user={user} />
        </div>
        <div>
          <h3 className="">Validar rallies</h3>
          <RalliesToValidate />
        </div>
        <div>
          <h3 className="">Eliminar Rallies rallies</h3>
          <RalliesCanBeDeleted />
        </div>
        <div>usuarios</div>
      </main>
    </>
  );
}

export default DashBoard;
