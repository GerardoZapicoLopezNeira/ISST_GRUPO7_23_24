import axios from "axios";

axios.defaults.baseURL = "http://localhost:9090/api/v1";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
};

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("auth_token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        window.localStorage.removeItem("auth_token");
        delete axios.defaults.headers.common["Authorization"];
    }
};
  

export const request = (method, url, data) => {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {"Authorization": `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        url: url,
        data: data,
        headers: headers
    });
};