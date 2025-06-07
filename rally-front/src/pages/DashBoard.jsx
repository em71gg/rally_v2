import React, { useContext } from "react";
import HeaderComponent from "../components/HeaderComponent";
import { UserContext } from "../context/user.context";
import { HeaderContext } from "../context/header.context";

function DashBoard() {
  const { user } = useContext(UserContext);
  const { links } = useContext(HeaderContext);
  const greetings = "Dashboard";
  return (
    <>
      <HeaderComponent greetings={greetings} links={links} />
      <div>DashBoard</div>
    </>
  );
}

export default DashBoard;
