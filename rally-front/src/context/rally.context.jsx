import { createContext, useContext, useState } from "react";
import { DateContext } from "./date.context";

const RallyContext = createContext();
function RallyProviderWrapper(props) {
  const { formDate } = useContext(DateContext);
  const [rallies, setRallies] = useState([
    //esto debe venir del fetch
  {
    "id": 1,
    "nombre": "Rally Primavera",
    "descripcion": "Fotos de naturaleza en primavera.",
    "uri_cover": "https://xyz.supabase.co/storage/v1/object/public/rallies/rally1.jpg",
    "fecha_inicio": "2025-04-01T00:00:00.000000Z",
    "fecha_fin": "2025-04-30T00:00:00.000000Z",
    "premio1": 2500,
    "premio2": 1500,
    "premio3": 800,
    "limite_fotos": 5,
    "limite_votos": 3,
    "category": { "id": 2, "categoria": "Naturaleza" },
    "propietario": { "id": 1, "name": "Ana", "nickname": "anafoto" },
    "participantes": [{ "id": 5 }, { "id": 7 }],
    "validado": 1
  },
  {
    "id": 2,
    "nombre": "Rally Urbano",
    "descripcion": "Captura la esencia de la ciudad.",
    "uri_cover": "https://xyz.supabase.co/storage/v1/object/public/rallies/rally2.jpg",
    "fecha_inicio": "2025-05-01T00:00:00.000000Z",
    "fecha_fin": "2025-05-31T00:00:00.000000Z",
    "premio1": 2000,
    "premio2": 1200,
    "premio3": 600,
    "limite_fotos": 3,
    "limite_votos": 2,
    "category": { "id": 3, "categoria": "Urbano" },
    "propietario": { "id": 2, "name": "Carlos", "nickname": "urbaneye" },
    "participantes": [{ "id": 6 }, { "id": 8 }, { "id": 9 }],
    "validado": 0
  },
  {
    "id": 3,
    "nombre": "Rally Retrato",
    "descripcion": "Retratos creativos y espontáneos.",
    "uri_cover": "https://xyz.supabase.co/storage/v1/object/public/rallies/rally3.jpg",
    "fecha_inicio": "2025-03-15T00:00:00.000000Z",
    "fecha_fin": "2025-04-15T00:00:00.000000Z",
    "premio1": 1800,
    "premio2": 900,
    "premio3": 500,
    "limite_fotos": 4,
    "limite_votos": 2,
    "category": { "id": 4, "categoria": "Retrato" },
    "propietario": { "id": 3, "name": "Lucía", "nickname": "lu_retrato" },
    "participantes": [{ "id": 10 }, { "id": 5 }],
    "validado": 1
  },
  {
    "id": 4,
    "nombre": "Rally Blanco y Negro",
    "descripcion": "Jugando con la luz y las sombras.",
    "uri_cover": "https://xyz.supabase.co/storage/v1/object/public/rallies/rally4.jpg",
    "fecha_inicio": "2025-06-01T00:00:00.000000Z",
    "fecha_fin": "2025-06-30T00:00:00.000000Z",
    "premio1": 2200,
    "premio2": 1100,
    "premio3": 700,
    "limite_fotos": 3,
    "limite_votos": 3,
    "category": { "id": 5, "categoria": "Blanco y Negro" },
    "propietario": { "id": 1, "name": "Ana", "nickname": "anafoto" },
    "participantes": [{ "id": 2 }, { "id": 4 }],
    "validado": 0
  },
  {
    "id": 5,
    "nombre": "Rally Nocturno",
    "descripcion": "Fotos nocturnas y luces urbanas.",
    "uri_cover": "https://xyz.supabase.co/storage/v1/object/public/rallies/rally5.jpg",
    "fecha_inicio": "2025-05-15T00:00:00.000000Z",
    "fecha_fin": "2025-06-15T00:00:00.000000Z",
    "premio1": 2700,
    "premio2": 1300,
    "premio3": 800,
    "limite_fotos": 5,
    "limite_votos": 3,
    "category": { "id": 3, "categoria": "Urbano" },
    "propietario": { "id": 4, "name": "Jorge", "nickname": "nightrider" },
    "participantes": [{ "id": 1 }, { "id": 7 }, { "id": 10 }],
    "validado": 1
  },
  {
    "id": 6,
    "nombre": "Rally de Comida",
    "descripcion": "Captura platos y momentos gastronómicos.",
    "uri_cover": "https://xyz.supabase.co/storage/v1/object/public/rallies/rally6.jpg",
    "fecha_inicio": "2025-02-10T00:00:00.000000Z",
    "fecha_fin": "2025-03-10T00:00:00.000000Z",
    "premio1": 1900,
    "premio2": 1000,
    "premio3": 600,
    "limite_fotos": 4,
    "limite_votos": 2,
    "category": { "id": 6, "categoria": "Gastronomía" },
    "propietario": { "id": 5, "name": "Natalia", "nickname": "cookshots" },
    "participantes": [{ "id": 3 }, { "id": 6 }, { "id": 7 }],
    "validado": 0
  },
  {
    "id": 7,
    "nombre": "Rally Macro",
    "descripcion": "Detalles que pasan desapercibidos.",
    "uri_cover": "https://xyz.supabase.co/storage/v1/object/public/rallies/rally7.jpg",
    "fecha_inicio": "2025-07-01T00:00:00.000000Z",
    "fecha_fin": "2025-07-31T00:00:00.000000Z",
    "premio1": 3000,
    "premio2": 1400,
    "premio3": 900,
    "limite_fotos": 3,
    "limite_votos": 3,
    "category": { "id": 7, "categoria": "Macro" },
    "propietario": { "id": 6, "name": "Sergio", "nickname": "minimundo" },
    "participantes": [{ "id": 4 }, { "id": 9 }],
    "validado": 1
  },
  {
    "id": 8,
    "nombre": "Rally Infantil",
    "descripcion": "Fotografía de niños y juegos.",
    "uri_cover": "https://xyz.supabase.co/storage/v1/object/public/rallies/rally8.jpg",
    "fecha_inicio": "2025-05-20T00:00:00.000000Z",
    "fecha_fin": "2025-06-20T00:00:00.000000Z",
    "premio1": 1700,
    "premio2": 800,
    "premio3": 500,
    "limite_fotos": 4,
    "limite_votos": 2,
    "category": { "id": 8, "categoria": "Familia" },
    "propietario": { "id": 7, "name": "Patricia", "nickname": "moments4kids" },
    "participantes": [{ "id": 2 }, { "id": 5 }],
    "validado": 0
  },
  {
    "id": 9,
    "nombre": "Rally Experimental",
    "descripcion": "Técnicas creativas y edición.",
    "uri_cover": "https://xyz.supabase.co/storage/v1/object/public/rallies/rally9.jpg",
    "fecha_inicio": "2025-04-15T00:00:00.000000Z",
    "fecha_fin": "2025-05-15T00:00:00.000000Z",
    "premio1": 2400,
    "premio2": 1200,
    "premio3": 700,
    "limite_fotos": 5,
    "limite_votos": 3,
    "category": { "id": 9, "categoria": "Experimental" },
    "propietario": { "id": 8, "name": "Mario", "nickname": "glitchcam" },
    "participantes": [{ "id": 3 }, { "id": 6 }, { "id": 9 }],
    "validado": 1
  },
  {
    "id": 10,
    "nombre": "Rally Rural",
    "descripcion": "Vida y paisajes del campo.",
    "uri_cover": "https://xyz.supabase.co/storage/v1/object/public/rallies/rally10.jpg",
    "fecha_inicio": "2025-06-10T00:00:00.000000Z",
    "fecha_fin": "2025-07-10T00:00:00.000000Z",
    "premio1": 2600,
    "premio2": 1300,
    "premio3": 800,
    "limite_fotos": 3,
    "limite_votos": 3,
    "category": { "id": 10, "categoria": "Rural" },
    "propietario": { "id": 9, "name": "Teresa", "nickname": "camposphoto" },
    "participantes": [{ "id": 1 }, { "id": 8 }],
    "validado": 0
  }


  ]);
  const [registered, setRegistered] = useState(false);

  const registerParticipantOnRally = (rallyId, userId) => {
    setRegistered(!registered);
    //llamar a la funcion de registro
    console.log(`Usuario ${userId} registrado en el rally ${rallyId}`);
    
  };

  return (
    <RallyContext.Provider
      value={{
        rallies,
        setRallies,
        registerParticipantOnRally,
        registered,
        setRegistered,
        //displayRallyInfoToParticipant,
      }}
    >
      {props.children}
    </RallyContext.Provider>
  );
}
export { RallyContext, RallyProviderWrapper };
