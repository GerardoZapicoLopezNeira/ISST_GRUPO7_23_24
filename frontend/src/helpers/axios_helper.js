import axios from "axios";
import { Form } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:9090/api/v1";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAuthToken = () => {
    return window.sessionStorage.getItem("auth_token");
};

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.sessionStorage.setItem("auth_token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        window.sessionStorage.removeItem("auth_token");
        delete axios.defaults.headers.common["Authorization"];
    }
};


export const request = (method, url, data) => {
    
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = { "Authorization": `Bearer ${getAuthToken()}` };
    }

    return axios({
        method: method,
        url: url,
        data: data,
        headers: headers
    });
};

export const uploadFile = (method, url, data) => {
    const axiosInstance = axios.create({
        timeout: 30000 // Set a longer timeout (e.g., 10 seconds)
      });

    const formData = new FormData();
    formData.append("file", data);
    
    return axiosInstance({
        method: method,
        url: url,
        data: formData,
        headers: {
            "Authorization": `Bearer ${getAuthToken()}`,
            "Content-Type": "multipart/form-data" // Set appropriate content type
        },
    });
};
