import { api, getCsrf } from "../api/axiosInstance";
import { createContext, useEffect } from "react";
import { useState } from "react";

const UserContext = createContext();

function UserProviderWrapper(props) {
  //variable del profile del usuario
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    surname: "",
    nickname: "",
    role: "",
    isLoggedIn: false,
  });

  //Lógica del registro
  const register = async (userData) => {
    try {
      console.log("getCsrf llamado");
      await getCsrf();
      console.log(document.cookie);

      // 1. Registro
      /*const response = */ await api.post("/api/register", userData);

      // 2. Obtener el usuario autenticado
      const { data } = await api.get("/api/user");
      console.log(data);

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      if (error.response) {
        return {
          success: false,
          errors: error.response.data.errors,
        };
      } else {
        return {
          success: false,
          errors: [error.message],
        };
      }
    }
  };

  const login = async (userData) => {
    try {
      // 1. Obtener el CSRF cookie
      await getCsrf();

      // 2. Enviar solicitud de login
      await api.post("/api/login", userData);

      // 3. Obtener el usuario autenticado
      const { data } = await api.get("/api/user");
      console.log(data);
      const userObject = {
        id: data.id,
        name: data.name,
        email: data.email,
        surname: data.surname,
        nickname: data.nickname,
        role: data.role,
        isLoggedIn: true,
      };
      setUser(userObject);

      return {
        success: true,
        userObject,
      };
    } catch (error) {
      if (error.response && error.response.data.errors) {
        return {
          success: false,
          errors: error.response.data.errors,
        };
      } else {
        return {
          success: false,
          errors: [error.message],
        };
      }
    }
  };

  const logout = async () => {
    try {
      await getCsrf();
      await api.post("/api/logout");

      setUser({
        id: null,
        name: "",
        email: "",
        surname: "",
        nickname: "",
        role: "",
        isLoggedIn: false,
      });
      return { success: true };
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
      return { success: false };
    }
  };

  const checkAuth = async () => {
    try {
      const { data } = await api.get("/api/user"); // Solo autentica si hay sesión válida
      setUser({
        ...data,
        isLoggedIn: true,
      });
    } catch {
      setUser((prev) => ({ ...prev, isLoggedIn: false }));
    }
  };
  useEffect(() => {
    checkAuth(); // ¿Ya tiene sesión válida?
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, register, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProviderWrapper };
