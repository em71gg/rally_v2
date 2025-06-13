import { createContext, useContext, useEffect, useState } from "react";
import { DateContext } from "./date.context";
import RegisterRally from "../components/RegisterRally";
import { getCsrf, api } from "../api/axiosInstance";

const RallyContext = createContext();
function RallyProviderWrapper(props) {
  const { formDate } = useContext(DateContext);
  const [rallies, setRallies] = useState([]);
  const [registered, setRegistered] = useState(false);

  const getRalliesInfo = async () =>{
    try{
      const response = await api.get('/api/rallies');
      setRallies(response.data);
    }
    catch(error){
      console.error("Error al obtener los rallies:", error);
    }
    
    
  }

  const registerParticipantOnRally = async (rallyId, userId) => {
    try{
      //await getCsrf();//neceario si user autenticado?
      await api.post('/api/register-for-rally', {
        rally_id: rallyId,
        user_id: userId,
      });
      console.log(`Usuario ${userId} registrado en el rally ${rallyId}`);
      setRegistered(true); 
      return {success:true}
    }catch(error){
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
    
    //setRegistered(!registered);
    //llamar a la funcion de registro
   // console.log(`Usuario ${userId} registrado en el rally ${rallyId}`);
    
  };

  const validateRally = async (rally_id) => {
    try{
      await getCsrf(); // Necesario para sesiones protegidas por Sanctum
      const response=  await api.put('/api/validate-rally', {id: rally_id});
      console.log("Rally validado:", response.data);

      // Actualiza el rally en el estado local
      setRallies((prevRallies) =>
        prevRallies.map((rally) =>
          rally.id === rally_id ? { ...rally, validado: 1 } : rally
        )
      );
      return { success: true };
    }catch(error) {
      console.error("Error al validar rally:", error);
      return {
      success: false,
      error: error?.response?.data?.message || error.message,
    };
    }
  };

  const deleteRally = async (rally_id) => {
    try {
      await getCsrf(); 
      const response=  await api.put('/api/delete-rally', {id: rally_id});
      console.log("Rally eliminado:", response.data);
      setRallies((prevRallies) => prevRallies.filter((rally) => rally.id !== rally_id));
      return { success: true };
    } catch (error) {
      console.error("Error al validar rally:", error);
      return {
      success: false,
      error: error?.response?.data?.message || error.message,
    }
  }
  }

  const createRally = async (rallyData)=>{
    try{
      await getCsrf();//necesario si user autenticado?
      await api.post("/api/rally", rallyData);

      //Rescato la respuesta
      const newRally = response.data;
      //Actualizo Rallies
      setRallies(prev => [...prev, newRally]);
      return {success:true}
    }catch(error){
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

  useEffect(() => {
    getRalliesInfo();
  }, []);

  return (
    <RallyContext.Provider
      value={{
        rallies,
        setRallies,
        registerParticipantOnRally,
        registered,
        setRegistered,
        createRally,
        validateRally,
        deleteRally
        //displayRallyInfoToParticipant,
      }}
    >
      {props.children}
    </RallyContext.Provider>
  );
}
export { RallyContext, RallyProviderWrapper };
