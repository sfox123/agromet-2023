import axios from "axios";

const Axios = axios.create({
  baseURL: "https://us-central1-express-439e0.cloudfunctions.net/app",
  // baseURL: "http://localhost:5001/express-439e0/us-central1/app",
});

export default Axios;
