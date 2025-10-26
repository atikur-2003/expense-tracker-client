import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // change if your backend runs elsewhere
});

// Add a request interceptor to attach Firebase ID Token
axiosSecure.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken(); // Get current user's token
      config.headers.Authorization = `Bearer ${token}`; // Add it to headers
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
