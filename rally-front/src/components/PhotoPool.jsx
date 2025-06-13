import { useContext, useEffect } from "react"
import { PhotoContext } from "../context/photo.context"


function PhotoPool() {
  const {getPhotosRally} = useContext(PhotoContext);
  useEffect(()=>{
    const photos = async () => getPhotosRally(14);
  },[])
  const photos = async () => getPhotosRally(14);
  console.log('Esto es lo de photos', photos);
  return (
    <div>PhotoPool</div>
  )
  
}

export default PhotoPool