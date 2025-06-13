import React from 'react'

function PhotoCard(props) {
    const { uri, selectPhotoUri, id, selectPhotoId } = props;

    const handleClick = () => {
        if (selectPhotoUri) selectPhotoUri(uri);
        if (selectPhotoId) selectPhotoId(id)
    };
  return (
    <div onClick={() => handleClick(uri)}>
        <img src={uri} alt="" className="" />
    </div>
  )
}

export default PhotoCard