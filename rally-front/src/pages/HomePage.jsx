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

      <h1>Mi front experimental</h1>
      <h2 className="">
        Practicando con pokemons, A ver ¿llegaremos al final? O no...Si!
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* comentado photohome temporalmente
      <PhotoHome />
      
      */}
      
      <Link to="/rally" className="link">
        Rally
      </Link>
    </>
  );
}

export default HomePage;
