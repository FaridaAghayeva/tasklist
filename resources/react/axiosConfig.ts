// axiosConfig.js
import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Replace with your actual base URL

});

export default axiosConfig;
