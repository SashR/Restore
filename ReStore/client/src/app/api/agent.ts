import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';


// Axios intercepters
axios.interceptors.response.use(resp => {
    return resp
}, (error: AxiosError) => {
    console.log("Caught by intercepter");
    return Promise.reject(error.response); // needs to be done
});


// Helper method for fetch data from response
const responseBody = (response: AxiosResponse) => response.data;

// methods object for crud commands
const requests = {
    get: async (url: string) => responseBody(await axios.get(url)),
    post: async (url: string, body: {}) => responseBody(await axios.post(url, body)),
    put: async (url: string, body: {}) => responseBody(await axios.put(url, body)),
    delete: async (url: string) => responseBody(await axios.delete(url)),
};

// methods objects for requests for catalog
const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`),
}

// errors mappings
const TestErrors = {
    get400Errors: () => requests.get('buggy/bad-request'),
    get401Errors: () => requests.get('buggy/unauthorised'),
    get404Errors: () => requests.get('buggy/not-found'),
    get500Errors: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}


const agent = { Catalog, TestErrors }; // wrapper for the catalog

export default agent;