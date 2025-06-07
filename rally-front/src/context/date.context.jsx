import { createContext } from "react";


const DateContext = createContext();

function DateProviderWrapper(props) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const options = {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute:'2-digit',
            hour12: false,
        };

        return date.toLocaleDateString('es-ES', options).replace(',' , ' a las ');
    }
    return (
        <DateContext.Provider value={{formatDate}}>
            {props.children}
        </DateContext.Provider>
    )
}

export {DateContext, DateProviderWrapper}