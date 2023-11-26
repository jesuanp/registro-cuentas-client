import axios from "axios";

const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_SOME_BASE_URL_AXIOS,
    // baseURL: 'http://localhost:3001',
    headers: {'Content-Type': 'application/json'}
});

export default clienteAxios;
