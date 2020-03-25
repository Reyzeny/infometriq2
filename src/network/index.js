import axios from 'axios'

let userData = localStorage.getItem("user_data");

let headerParams = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

if (userData && userData.auth_token) {
    headerParams["Authorization"] = `Bearer ${userData.auth_token}`;
}

let config =  {
    headers: headerParams,
    baseURL: 'https://calm-plains-58791.herokuapp.com/api/'
}

let axiosInstance = axios.create(config);
export default axiosInstance;
