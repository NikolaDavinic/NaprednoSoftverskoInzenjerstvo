import axios from "axios";
import {apiEndpoint} from '../../constants.ts'
import { lsGetToken } from "./localStorage.ts";

export default axios;
const axiosInstance = axios.create({
    baseURL: apiEndpoint,
});

axiosInstance.interceptors.request.use(
    (request) => {
        const token = lsGetToken();
        if(token) {
            request.headers!['Authorization'] = `Bearer ${token}`;
        }

        return request;

    },
    (error) => {
        Promise.reject(error);
    }
)

export const api = axiosInstance;