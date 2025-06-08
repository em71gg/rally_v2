import { getCsrf, api } from "../api/axiosInstance";
import { createContext, useState } from "react";

const PhotoContext = createContext(); //variable que aloja la función que crea el contexto

function PhotoProviderWrapper(props) {
    const [photos, setPhotos] = useState([]);

    // Crar una foto en el modelo, subir una imagen a Supabase/Laravel y obtener el id de la foto.
    const uploadPhoto = async ({user_id, nombre, image_file}) => {
        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('nombre', nombre);
        formData.append('uri_cover', image_file);
        try {
            await getCsrf();//neceario si user autenticado?
            const response = await api.post('/api/create-photo', formData);
            return response.data.data.id;
            //const fotoId = response.data?.data?.id;
            
        }catch (error) {
            console.error('Error al subir la foto:', error);
            throw error;
        }
    }; 

    // Asociar una foto a un rally
    const registerPhoto = async ({ rally_id, foto_id }) => {
    try {
      await getCsrf();//neceario si user autenticado?
      const response = await api.post(
        "/api/submit-photo",
        {
          rally_id,
          foto_id,
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error al asociar la foto:", error.response?.data || error.message);
      throw error;
    }
  }; 

    
    const getPhoto = (index) => {
      
    };
    return (
        <PhotoContext.Provider value={{photos, setPhotos, getPhoto, uploadPhoto, registerPhoto}}>
            {props.children} 
        </PhotoContext.Provider>
    )
      
}
    

export {PhotoContext, PhotoProviderWrapper};
