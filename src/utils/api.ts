import axios from "axios";

let baseURL = process.env.API_URL;

const instance = axios.create({
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    baseURL: baseURL,
});

export default instance;
