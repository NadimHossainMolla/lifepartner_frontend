import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:7249/api";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add Authorization Token Interceptor
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Retrieve token from storage or context
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;