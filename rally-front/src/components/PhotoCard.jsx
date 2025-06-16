import './PhotoCard.css';

function PhotoCard(props) {
    const { uri, onSelect, id, nombre } = props;

    const handleClick = () => {
      
      if ( onSelect) onSelect(uri, id);
        /*if (selectPhotoUri) {selectPhotoUri(uri)}else{selectPhotoUri('')};
        if (selectPhotoId) selectPhotoId(id)
        */
    };
  return (
    <div onClick={handleClick}>
      <figure>
    <img src={uri} alt={nombre} className="" loading='lazy'/>
    <figcaption>{nombre}</figcaption>
      </figure>
    </div>
  )
}

export default PhotoCard