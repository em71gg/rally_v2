import { useContext, useState } from "react";
import { RallyContext } from "../context/rally.context";
import { Navigate, useParams } from "react-router";
import { HeaderContext } from "../context/header.context";
import HeaderComponent from "../components/HeaderComponent";
import PhotoPool from "../components/PhotoPool";
import PhotoCard from "../components/PhotoCard";
import PhotoCardDetails from "../components/PhotoCardDetails";

function RallyPage(props) {
  const { rallies, loading, error } = useContext(RallyContext);
  const { links } = useContext(HeaderContext);
  const { id } = useParams();
  const [selectedPhotoUri, setSelectedPhotoUri] = useState('');
  const [photoId, setPhotoId] = useState('');

  const handlePhotoId = (photoId) => setPhotoId(photoId);
  if (loading) return <div>Cargando....</div>;
  if (error) return <div>Error</div>;
  //console.log("Rallies: ", rallies);
  console.log('ID de la foto del photolist', )
  const actualRally = rallies.find((rally) => rally.id === parseInt(id));
  //console.log("Qué es rally: ", actualRally);
  //console.log("Nombre rally: ", actualRally.nombre);
  if (!actualRally) {
    console.log("No existe el rally");
    return <Navigate to={"/error"} />;
  }
  const greetings = `Rally ${actualRally.nombre}fotos`;

  return (
    <>
      <HeaderComponent greetings={greetings} links={links} />
      {selectedPhotoUri && (
        <div className="photo-details">
          <PhotoCardDetails selectedPhotoUri={selectedPhotoUri}id={id} photoId={photoId}/>
        </div>
      )}
      <div>
        RallyPage del rally {actualRally.nombre} con id: {actualRally.id}.
      </div>
      <PhotoPool id={id} selectPhotoUri={setSelectedPhotoUri} handlePhotoId={handlePhotoId}/>
    </>
  );
}

export default RallyPage;
