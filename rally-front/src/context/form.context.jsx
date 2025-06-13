import { createContext, useEffect, useState } from "react";
import { api } from "../api/axiosInstance";

const FormContext = createContext();

function FormProviderWrapper(props){
    const [categories, setCategories] = useState([])
    
    useEffect(()=>{
         const getCategories = async () =>{
        try{
            const response = await api.get('/api/categories');
            setCategories(response.data.data);
            
        }catch(error) {
            console.error('Error al solicitar las categorias.');
        }
    };
    getCategories();
    }, []);

    return (
        <FormContext.Provider value={{categories}}>
            {props.children}
        </FormContext.Provider>
    )
   
}

export { FormContext, FormProviderWrapper};