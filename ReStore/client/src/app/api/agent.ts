import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';

// Helper method for fetch data from response
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: async (url: string) => responseBody(await axios.get(url)),
    post: async (url: string, body: {}) => responseBody(await axios.post(url, body)),
    put: async (url: string, body: {}) => responseBody(await axios.put(url, body)),
    delete: async (url: string) => responseBody(await axios.delete(url)),
};