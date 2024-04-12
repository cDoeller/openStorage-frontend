import axios from 'axios'

 
class ArtworksService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005'
    });
 
    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');
 
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
 
      return config;
    });
  }
 
  // POST /api/artworks
  createArtwork = requestBody => {
    return this.api.post('/api/artwork', requestBody);
  };
 
  // GET /api/artworks
  getAllArtworks = () => {
    return this.api.get('/api/artwork');
  };
 
  // GET /api/artworks/:id
  getArtwork = id => {
    return this.api.get(`/api/artwork/${id}`);
  };
 
  // PUT /api/artworks/:id
  updateArtwork = (id, requestBody) => {
    return this.api.put(`/api/artwork/${id}`, requestBody);
  };
 
  // DELETE /api/artworks/:id
  deleteArtwork = id => {
    return this.api.delete(`/api/artwork/${id}`);
  };
}


const artworksService = new ArtworksService

export default artworksService()