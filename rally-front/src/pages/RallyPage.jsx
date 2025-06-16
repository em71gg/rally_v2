import { useContext, useState } from "react";
import { RallyContext } from "../context/rally.context";
import { Navigate, useParams } from "react-router";
import { HeaderContext } from "../context/header.context";
import HeaderComponent from "../components/HeaderComponent";
import PhotoPool from "../components/PhotoPool";
import './RallyPage.css';
import PhotoCardDetails from "../components/PhotoCardDetails";
import { PhotoContext } from "../context/photo.context";
import RallyResultsChart from "../components/RallyResultsChart";
import { VoteContext, VoteProviderWrapper } from "../context/vote.context";
import PhotoVoterPool from "../components/PhotoVoterPool";

function RallyPage(props) {
  const { photos } = useContext(PhotoContext);
  const { rallies, loading, error } = useContext(RallyContext);
  const { links } = useContext(HeaderContext);
  const { id } = useParams();
  const { results } = useContext(VoteContext);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [selectedPhotoUri, setSelectedPhotoUri] = useState("");
  const [photoId, setPhotoId] = useState("");

  const handlePhotoSelect = (index) => {
    console.log("Foto seleccionada, index:", index);
    setSelectedPhotoIndex(index);
  };

  if (loading) return <div>Cargando....</div>;
  if (error) return <div>Error</div>;
  //console.log("Rallies: ", rallies);
  console.log("ID de la foto del photolist");
  const actualRally = rallies.find((rally) => rally.id === parseInt(id));
  //console.log("Qué es rally: ", actualRally);
  //console.log("Nombre rally: ", actualRally.nombre);
  if (!actualRally) {
    console.log("No existe el rally");
    return <Navigate to={"/error"} />;
  }
  const greetings = `Rally ${actualRally.nombre}`;

  const rallyLinks = {
    home: "Home",
    rallyPhotos: "Fotos del rally",
    votedPhotos: "Fotos votadas",
    results: "Resultados del rally"
  };
  
  /*
  console.log(
    "Datos del getResults para este rally con id= ",
    actualRally.id,
    " son -> ",
    results
  );
  */
  return (
    <VoteProviderWrapper rally_id={actualRally.id}>
      <>
        <HeaderComponent greetings={greetings} links={rallyLinks} />
        <div className="display-rally">
          {selectedPhotoIndex !== null && (
          <div className="photo-details">
            <PhotoCardDetails
              //selectedPhotoUri={selectedPhotoUri}
              photos={photos.fotos}
              currentIndex={selectedPhotoIndex}
              setCurrentIndex={setSelectedPhotoIndex}
              id={id}
              //photoId={photoId}
              onClose={() => {
                //setSelectedPhotoUri('');
                //setPhotoId('');
                setSelectedPhotoIndex(null);
              }}
              onPhotoSelect={handlePhotoSelect}
            />
          </div>
        )}
        <div>
          RallyPage del rally {actualRally.nombre} con id: {actualRally.id}.
        </div>
        <div className="rally-photos" id="rally-photos">
        <PhotoPool id={id} onPhotoSelect={handlePhotoSelect} />
        </div>
        
        <div className="voted-photos" id="voted-photos">
          <h2 className="">Fotos votadas</h2>
          
          <PhotoVoterPool rally_id={actualRally.id} />
        </div>
        <div className="rally-results" id="rally-results">
          <h2 className="">Resultados de las votaciones</h2>
          <RallyResultsChart rally_id={actualRally.id} nombre={actualRally.nombre} />
        </div>
        </div>
        
      </>
    </VoteProviderWrapper>
  );
}

export default RallyPage;
