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

    const formatDatetime = (datetime) => {
        const date = new Date(datetime);
        return date.toISOString().slice(0, 19).replace("T", " ");
    };
    return (
        <DateContext.Provider value={{formatDate, formatDatetime}}>
            {props.children}
        </DateContext.Provider>
    )
}

export {DateContext, DateProviderWrapper}