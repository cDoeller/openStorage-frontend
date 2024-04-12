import axios from 'axios'

 
class CitiesService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005'
    });
 
    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");
 
      if (storedToken) {
        console.log("setting headers...", storedToken)
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
 
      return config;
    });
  }
 
  // POST one city
  createCity = requestBody => {
    return this.api.post('/api/city', requestBody);
  };
 

  // GET one city
  getCity = id => {
    return this.api.get(`/api/city/${id}`);
  };
 

}


const citiesService = new CitiesService()

export default citiesService