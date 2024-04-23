import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // this route does not exist
  // // GET all users
  // getAllUsers = () => {
  //   return this.api.get("/api/user");
  // };

  // // GET Artist Search Query by name
  // getArtistsByName = (query) => {
  //   return this.api.get(`/api/user/artists/search?name=${query}`);
  // };

  // GET all artists
  getAllArtists = () => {
    return this.api.get("/api/user/artists");
  };

// GET only artists with artworks
getAllArtistsWithWorks = () => {
    return this.api.get(`/api/user/artists/works`);
  };

  // GET one user
  getUser = (id) => {
    return this.api.get(`/api/user/${id}`);
  };

  // GET all favorites
  getFavorites = (id) =>{
    return this.api.get(`/api/user/${id}/favorites`);
  }

  // UPDATE favorites
  updateFavorites = (id, favorites) =>{
    return this.api.patch(`/api/user/${id}/favorites`, favorites);
  }

  // PATCH update a user
  updateUser = (id, requestBody) => {
    return this.api.patch(`/api/user/${id}/update`, requestBody);
  };

  // DELETE a user
  deleteUser = (id) => {
    return this.api.delete(`/api/user/${id}/delete`);
  };
}

const userService = new UserService();

export default userService;
