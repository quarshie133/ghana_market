// API setup (axios instance, baseURL) 
import axios from 'axios';

// This creates a reusable instance with the base URL already set
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/',
})

export default api;