import "./HomePage.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
//import PhotoHome from "../components/PhotoHome";
import { HeaderContext } from "../context/header.context";
import { RallyContext } from "../context/rally.context";
import RallyCard from "../components/RallyCard";
import RallyCardToBe from "../components/RallyCardToBe";
import axios from 'axios';

function HomePage() {

  const { links } = useContext(HeaderContext);
  const { rallies, setRallies } = useContext(RallyContext);
  const now= new Date();
  console.log('EStos son los rallies que están llegando: ', rallies);

  const greetings = "Bienvenido a Rallies Fotográficos";

  const ralliesActive = rallies
  .filter((rally) => {
    const starts = new Date(rally.fecha_inicio);
    const ends = new Date(rally.fecha_fin);
    return rally.validado === 1 && starts <= now && ends >= now;
  })
  .map((rally) => (
    <li className="rallies-list" key={rally.id}>
      <RallyCard rally={rally} />
    </li>
  ));

  const ralliesToBe = rallies
  .filter((rally) => {
    const starts = new Date(rally.fecha_inicio);
    const ends = new Date(rally.fecha_fin);
    return rally.validado === 1 && starts > now ;
  })
  .map((rally) => (
    <li className="rallies-list" key={rally.id}>
      <RallyCardToBe rally={rally} />
    </li>
  ));


  return (
    <>
      <HeaderComponent greetings={greetings} links={links} />

      
      <h2 className="">
        Pagina de despliegue de rallies fotográficos.
      </h2>
       <section className="rallies">
        <h2 className="">Listado de rallies abiertos</h2>
        <ul className="">
          {ralliesActive}
        </ul>
        
      </section>
      <section className="rallies-to-be">
        <h2 className="">Listado de futuros rallies</h2>
        <ul className="">
          {ralliesToBe}
        </ul>
        
      </section>
      
    </>
  );
}

export default HomePage;
