import axios from "axios";

const API_URL = "https://localhost:5001/User/";

const register = (ticketid, username, avatar) => {
    console.log(`https://localhost:5001/User/${ticketid}&&${username}&&${avatar}`);
    return axios.post(`https://localhost:5001/User/${ticketid}&&${username}&&${avatar}`);
};

const login = (username, password) => {
    return axios
        .post(API_URL, {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("result")
};

const authService = {
    register,
    login,
    logout,
};

export default authService;