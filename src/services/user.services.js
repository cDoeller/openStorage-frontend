import axios from 'axios'

 
class UserService {
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
 

 
  // GET all users
  getAllUsers = () => {
    return this.api.get('/api/user');
  };
 
  // GET one user
  getUser = id => {
    return this.api.get(`/api/user/${id}`);
  };
 
  // UPDATE a user
  updateUser = (id, requestBody) => {
    return this.api.put(`/api/user/${id}/update`, requestBody);
  };
 
  // DELETE a user
  deleteUser = id => {
    return this.api.delete(`/api/user/${id}/delete`);
  };
}


const userService = new UserService()

export default userService