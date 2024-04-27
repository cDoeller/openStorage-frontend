import axios from "axios";

class UploadService {
    constructor(){
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

    uploadImage = (file) => {
      return this.api.post("/api/upload", file)
        // .then(res => res.data)
        // .catch((err)=>{
        //     console.log(err)
        // });
    };

}

const uploadService = new UploadService

export default uploadService