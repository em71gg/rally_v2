import { createContext, useEffect, useState } from "react";
import { api } from "../api/axiosInstance";

const VoteContext = createContext();

function VoteProviderWrapper(props) {
  const {rally_id} = props;
  const [ip, setIp] = useState("");
  const [results, setResults] = useState([]);
  const [userVotes, setUserVotes] = useState([]);
  //const [voteId, setVoteId] = useState('');
  const [loading, setLoading] = useState(true);
  console.log('Rally_id del contexto', rally_id);

  const getResults = async (rally_id) => {
    setLoading(true); 
    try {
      const res = await api.get('api/results', { params: { rally_id }});
      setResults(res.data.data); 
    } catch (error) {
      console.error("Error al obtener resultados", error);
    }finally{
        setLoading(false);
    }
  };

  useEffect(() => {
    const getIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIp(data.ip);
      } catch (error) {
        console.error("Error al obtener la ip del visitante", error);
      }
    };
    if(rally_id) {
      getResults(rally_id);
    }
    
    getIp();

    //getUserVotes(rally_id, ip)
  }, []);

  const vote = async (voteData) => {
    try {
      const votacion = await api.post("/api/vote", voteData);
      //tras votar se actuliza el resultado
      await getResults(rally_id);
      await getUserVotes(rally_id, ip);
      return {
        success: true,
        data: votacion,
      };
    } catch (error) {
      if (error.response) {
        return {
          success: false,
          errors: error.response.data.errors,
        };
      } else {
        return {
          success: false,
          errors: [error.message],
        };
      }
    }
  };

  const getUserVotes = async (rally_id, ip) =>{
    try{
      const votes = await api.get('/api/uservotes', {params: {rally_id, ip}});
      setUserVotes(votes.data);
    }catch(error){
      console.error("Error al obtener los votos", error);
    }finally{
      setLoading(false);
    }
  }

  const deleteVote = async (id) => {
      try{
        await api.delete('/api/deleteVote', {params: {id}});
        await getUserVotes(rally_id, ip);
        await getResults(rally_id)
      }catch(error){
        console.error("Error al obtener los votos", error);
      }
  }

  return (
    <VoteContext.Provider value={{ vote, ip, getResults, results, userVotes, getUserVotes, deleteVote }}>
      {props.children}
    </VoteContext.Provider>
  );
}

export { VoteContext, VoteProviderWrapper };
