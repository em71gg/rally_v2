import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
//axios.defaults.baseURL = "http://localhost:8001";

//leer cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return null;
}

//Para autenticacion
export const getCsrf = async () => {
  return axios.get("http://localhost:8001/sanctum/csrf-cookie",); // sin baseURL  
};


export const api = axios.create({
  baseURL: "http://localhost:8001",
  headers: {
    
    Accept: "application/json",
    //'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
  },
});


