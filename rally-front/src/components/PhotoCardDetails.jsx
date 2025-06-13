import FiveStars from "./FiveStars";
import PhotoCard from "./PhotoCard";
import './PhotoCardDetails.css'

function PhotoCardDetails(props) {
  const { selectedPhotoUri, id, photoId } = props;
  console.log("Rally_id: ", id, "PhotoId: ", photoId);

  return (
    <div className="card">
      <div className="backwards">
        <h1 className="">‹</h1>
      </div>
      <div className="photo-container">
        <PhotoCard uri={selectedPhotoUri} />
      </div>
      <div className="fordwards">
        <h1 className="">›</h1>
      </div>
      <div className="vote-system">
        <FiveStars />
      </div>
    </div>
  );
}

export default PhotoCardDetails;
