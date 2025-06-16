
import { useContext } from 'react';
import './PhotoVoterCard.css';
import { VoteContext } from '../context/vote.context';
function PhotoVoterCard(props) {
  const  { uri, calidadArtistica, calidadTecnica, originalidad, voteId, nombre } = props;
  const { deleteVote } = useContext(VoteContext);
  
  return (
    <div className='voter-card'>
      
      <figure className="figure">
     <img src={uri} alt={nombre} loading='lazy'/>
     <figcaption className='voted-data'>{nombre} <br />Calidad artística: {calidadArtistica}<br />
       Calidad técnica: {calidadTecnica} <br /> Originalidad: {originalidad}</figcaption>
      </figure>

       <button className="votado" onClick={() => deleteVote(voteId)}>Retirar voto</button>
      
    </div>
  )
}

export default PhotoVoterCard