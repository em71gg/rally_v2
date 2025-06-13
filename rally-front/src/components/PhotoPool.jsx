import { useContext, useEffect, useState } from "react";
import { PhotoContext } from "../context/photo.context";
import './PhotoPool.css';
import PhotoCard from "./PhotoCard";

function PhotoPool(props) {
  const { getPhotosRally, photos, loadingPhotos, photoError } =
    useContext(PhotoContext);
  const { id, handlePhotoId} = props;

  useEffect(() => {
    getPhotosRally({ rally_id: id });
  }, [id]);
  if (loadingPhotos) return <p>Cargando fotos...</p>;
  if (photoError) return <p>{photoError}</p>;
  
    console.log("Esto es lo de photos", photos);
  const photosToDysplay = Array.isArray(photos.fotos)
  ? photos.fotos.map((photo) =>{
    return (
      <li className="img" key={photo.id}>
      <PhotoCard 
      uri={photo.uri_imagen}
      selectPhotoUri={props.selectPhotoUri}
      id={photo.id}
      selectPhotoId={props.handlePhotoId}
       />
      {/*<img src={photo.uri_imagen} alt="" className="" />*/}
    </li>
    )
  }) : [];
  
  return (
    <div>
      <h2 className="">PhotoPool del rally con id {id}.</h2>
      <div className="container">
       <ul className='img-grid'>{photosToDysplay}</ul>
      </div>
      
    </div>
  );
}

export default PhotoPool;
