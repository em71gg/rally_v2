import { useContext, useEffect, useState } from "react";
import "./FiveStars.css"; 

import { VoteContext } from "../context/vote.context";


function FiveStars(props) {
  const {vote, ip } = useContext(VoteContext);
  const { photoId, rallyId } = props;
  const [hovered1, setHovered1] = useState(0);
  const [selected1, setSelected1] = useState(0);
  const [hovered2, setHovered2] = useState(0);
  const [selected2, setSelected2] = useState(0);
  const [hovered3, setHovered3] = useState(0);
  const [selected3, setSelected3] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    // Resetear valores al cambiar de foto
    setSelected1(0);
    setSelected2(0);
    setSelected3(0);
    setError(null);
  }, [photoId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
   
      setSubmitting(true);
      setError(null);
      
      const voteResult = await vote({
        ip: ip,
        foto_id: photoId,
        rally_id: rallyId,
        calidad_tecnica: selected1,
        calidad_artistica: selected2,
        originalidad: selected3,
      });

      if (voteResult. success) {
        console.log('votacion enviada: ');
      }
      else {
        setError('Error al enviar el voto: ' + (voteResult.errors?.[0] || 'Desconocido.'));
        console.error(voteResult.errors);
      }
      /*
      const votacion = await api.post("/api/vote", {
        ip,
        foto_id: photoId,
        rally_id: rallyId,
        calidad_tecnica: selected1,
        calidad_artistica: selected2,
        originalidad: selected3,
      });
      */
    
      setSubmitting(false);
  
  };

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <div className="fieldset-wrapper">
        <div className="criteria">
          <p className="">Calidad técnica:</p>
        </div>
        <div className="rate">
          {[1, 2, 3, 4, 5].map((star) => (
            <label
              key={star}
              onMouseEnter={() => setHovered1(star)}
              onMouseLeave={() => setHovered1(0)}
              onClick={() => setSelected1(star)}
              style={{
                cursor: "pointer",
                fontSize: "1.3rem",
                color: star <= (hovered1 || selected1) ? "#c59b08" : "#eee",
                textShadow: star <= hovered1 ? "#fc0 0 0 20px" : "",
              }}
            >
              ★
              <input
                type="radio"
                name="calidad-artistica"
                value={selected2}
                style={{ display: "none" }}
              />
            </label>
          ))}
        </div>

        <div className="criteria">
          <p className="">Calidad artística:</p>
        </div>
        <div className="rate">
          {[1, 2, 3, 4, 5].map((star) => (
            <label
              key={star}
              onMouseEnter={() => setHovered2(star)}
              onMouseLeave={() => setHovered2(0)}
              onClick={() => setSelected2(star)}
              style={{
                cursor: "pointer",
                fontSize: "1.3rem",
                color: star <= (hovered2 || selected2) ? "#fc0" : "#eee",
                textShadow: star <= hovered2 ? "#fc0 0 0 20px" : "",
              }}
            >
              ★
              <input
                type="radio"
                name="calidad-artistica"
                value={selected2}
                style={{ display: "none" }}
              />
            </label>
          ))}
        </div>
        <div className="criteria">
          <p className="">Originalidad:</p>
        </div>
        <div className="rate">
          {[1, 2, 3, 4, 5].map((star) => (
            <label
              key={star}
              onMouseEnter={() => setHovered3(star)}
              onMouseLeave={() => setHovered3(0)}
              onClick={() => setSelected3(star)}
              style={{
                cursor: "pointer",
                fontSize: "1.3rem",
                color: star <= (hovered3 || selected3) ? "#fc0" : "#eee",
                textShadow:
                  star <= (hovered3 || selected3) ? "#fc0 0 0 50px" : "",
              }}
            >
              ★
              <input
                type="radio"
                name="originalidad"
                value={selected3}
                style={{ display: "none" }}
              />
            </label>
          ))}
        </div>
        <button className="vote-btn">Votar</button>
      </div>
    </form>
  );
}

export default FiveStars;
