import axios from "axios";

class RentalsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        console.log("setting headers...", storedToken);
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/rentals (create pending rental)
  createRental = (body) => {
    return this.api.post("/api/rentals", body);
  };

  // GET /api/rentals/:id
  getRental = (id) => {
    return this.api.get(`/api/rentals/${id}`);
  };

  // GET all pending rentals (requests) by one user
  // /api/rentals/:user_id/pending
  getPendingRentalsUser = (userId) => {
    return this.api.get(`/api/rentals/${userId}/pending`);
  };

  // GET all approved rentals for one user
  // /api/rentals//:user_id/approved
  getApprovedRentalsUser = (userId) => {
    return this.api.get(`/api/rentals/${userId}/approved`);
  };

  // PATCH /api/rentals/:id
  updateRental = (id, requestBody) => {
    return this.api.patch(`/api/rentals/${id}`, requestBody);
  };
}

const rentalsService = new RentalsService();

export default rentalsService;
