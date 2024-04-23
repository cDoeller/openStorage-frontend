import axios from 'axios'

 
class CityService {
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
 

  // GET all cities
  getAllCities = () => {
    return this.api.get(`/api/city`);
  };

}


const cityService = new CityService()

export default cityService