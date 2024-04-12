import axios from 'axios'

 
class ArtworksService {
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
 
  // POST /api/artworks
  createArtwork = requestBody => {
    return this.api.post('/api/artworks', requestBody);
  };
 
  // GET /api/artworks
  getAllArtworks = () => {
    return this.api.get('/api/artworks');
  };
 
  // GET /api/artworks/:id
  getArtwork = id => {
    return this.api.get(`/api/artworks/${id}`);
  };
 
  // PUT /api/artworks/:id
  updateArtwork = (id, requestBody) => {
    return this.api.put(`/api/artworks/${id}`, requestBody);
  };
 
  // DELETE /api/artworks/:id
  deleteArtwork = id => {
    return this.api.delete(`/api/artworks/${id}`);
  };
}


const artworksService = new ArtworksService()

export default artworksService