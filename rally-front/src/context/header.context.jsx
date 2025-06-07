import { createContext, useState } from "react";


const HeaderContext = createContext();

function HeaderProviderWrapper(props){
    const [greetings, setGreetings] = useState("Rally Fotográfico");
      const links = {
        home: "Home",
        contact: "Contacto",
        register: "Registro",
        blog: "Blog",
        login: "Login",
      };
      return (
        <HeaderContext.Provider value={{greetings, setGreetings, links}}>
            {props.children}
        </HeaderContext.Provider>
      )
}

export {HeaderContext, HeaderProviderWrapper}