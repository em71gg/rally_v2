import { useContext, useEffect } from "react"
import { VoteContext } from "../context/vote.context"
import PhotoVoterCard from "./PhotoVoterCard";
import './PhotoVoterPool.css';


function PhotoVoterPool(props) {
    const { rally_id } = props;
    const { ip, userVotes, getUserVotes } = useContext(VoteContext);

    useEffect(()=>{

        (ip && getUserVotes(rally_id, ip));
    },[ip]);
    //const actualUserVotes = userVotes.map((vote) =>{});
    console.log(userVotes);
    console.log(ip);
    console.log(userVotes.data);

    const actualUserVotes = Array.isArray(userVotes?.data) && 
    userVotes.data.map((vote) =>{
        return (
            <li className="" key={vote.id}>
                <PhotoVoterCard
                uri = {vote.foto?.uri_imagen}
                calidadArtistica = {vote.calidad_artistica}
                calidadTecnica = {vote.calidad_tecnica}
                originalidad = {vote.originalidad} 
                nombre= {vote.foto?.nombre}
                voteId = {vote.id}/>

            </li>
        );
    });


  return (
    <div className="container-voted">
        <ul className="voted-list">
            {actualUserVotes}
        </ul>
    </div>
    
  )
}

export default PhotoVoterPool