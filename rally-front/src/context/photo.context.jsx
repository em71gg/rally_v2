import axios from "axios";
import { createContext, useState } from "react";

const PhotoContext = createContext(); //variable que aloja la función que crea el contexto

function PhotoProviderWrapper(props) {
    const [photos, setPhotos] = useState([]);

    // Crar una foto en el modelo, subir una imagen a Supabase/Laravel y obtener el id de la foto.
    const uploadPhoto = async ({user_id, nombre, image_file}) => {
        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('nombre', nombre);
        formData.append('image_file', image_file);
        try {
            const response = await axios.post('/api/create-´photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            const fotoId = response.data?.data?.id;
            if(!fotoId) throw new Error('No se devolvió el id de la foto.');
            return fotoId
        }catch (error) {
            console.error('Error al subir la foto:', error.response?.data || error.message);
            throw error;
        }
    }; 

    // Asociar una foto a un rally
    const registerPhoto = async ({ rally_id, foto_id }) => {
    try {
      const response = await axios.post(
        "/api/fotos/submit-to-rally",
        {
          rally_id,
          foto_id,
        },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error al asociar la foto:", error.response?.data || error.message);
      throw error;
    }
  }; 

    
    const getPhoto = (index) => {
       /* return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${index}`, {
            withCredentials: false,
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            
            console.error("Error al cargar los datos", error.message || error);
           
        });
        */
    };
    return (
        <PhotoContext.Provider value={{photos, setPhotos, getPhoto, uploadPhoto, registerPhoto}}>
            {props.children} 
        </PhotoContext.Provider>
    )
      
}
    

export {PhotoContext, PhotoProviderWrapper};
