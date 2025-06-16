import { useNavigate } from "react-router";
import FiveStars from "./FiveStars";
import PhotoCard from "./PhotoCard";
import "./PhotoCardDetails.css";
import { useContext, useEffect, useState } from "react";
import { VoteContext } from "../context/vote.context";

function PhotoCardDetails(props) {
  const { photos, currentIndex, setCurrentIndex, id, onClose, photoId } = props;
  const currentPhoto = photos[currentIndex];
  const atTheEnd = currentIndex == photos.length - 1;
  const atTheStart = currentIndex == 0;
  const {ip, userVotes } = useContext(VoteContext);
  const [canVote, setCanVote] = useState(true);

  const goForwards = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goBackwards = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  console.log("Rally_id: ", id, "PhotoId: ", photoId);
  useEffect(() => {
    if(userVotes?.data?.length >= 3){
      setCanVote(false);
    }else {
      setCanVote(true);
    }
  }, [userVotes]);
  

  return (
    <div className="card">
      <div className="backwards">
        <button className="translucent" onClick={goBackwards}>
          <h1 className={atTheStart ? "arrow hidden" : "arrow"}>‹</h1>
        </button>
      </div>
      <div className="photo-container">
        <PhotoCard
          uri={currentPhoto.uri_imagen}
          id={photoId}
          onSelect={onClose}
        />
      </div>
      <div className="fordwards">
        <button className="translucent" onClick={goForwards}>
          <h1 className={atTheEnd ? "arrow hidden" : "arrow"}>›</h1>
        </button>
      </div>
      
      <div className="vote-system">
        {canVote && <FiveStars photoId={currentPhoto.id} rallyId={id} />}
        
        {!canVote && <p>No puedes votar </p>}
      </div>
    </div>
    
  );
}

export default PhotoCardDetails;
