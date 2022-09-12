import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { ProductParams } from "../models/product";

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

interface ResponseData {
    data: {
        title: string;
        status: number;
        errors?: Object;
    };
    status: number;
}

const sleep = () => new Promise(resolve => setTimeout(resolve,1000));
// Axios intercepters
axios.interceptors.response.use(async (resp) => {
    await sleep();
    return await resp;
}, async (error: AxiosError) => {
    console.log("Caught by intercepter");
    const {data, status} = await error.response as ResponseData; 
    switch (status) {
        case 401:
            toast.error(data.title);
            break;
        case 400:
            if(!!data.errors){
                const modelStateErrors: string[] = [];
                for(const key in data.errors){
                    // @ts-ignore
                    if(data.errors[key]) modelStateErrors.push(data.errors[key]);
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 404:
            toast.error(data.title);
            break;
        case 500:
            history.push( '/server-error',{...data});
            break;
        default:
            break;
    }
    return Promise.reject(error.response); // needs to be done
});


// Helper method for fetch data from response
const responseBody = (response: AxiosResponse) => response.data;

// methods object for crud commands
const requests = {
    get: async (url: string, params?: URLSearchParams) => responseBody(await axios.get(url, {params})),
    post: async (url: string, body: {}) => responseBody(await axios.post(url, body)),
    put: async (url: string, body: {}) => responseBody(await axios.put(url, body)),
    delete: async (url: string) => responseBody(await axios.delete(url)),
};

// methods objects for requests for catalog
const Catalog = {
    list: (params: URLSearchParams) => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`),
}

// Basket methods
const Basket = {
    get:       () => requests.get('basket'),
    addItem:   (pId: number, qty = 1) => requests.post(`basket?productId=${pId}&quantity=${qty}`, {}),
    removeItem:(pId: number, qty = 1) => requests.delete(`basket?productId=${pId}&quantity=${qty}`),
}

// errors mappings
const TestErrors = {
    get400Errors: () => requests.get('buggy/bad-request'),
    get401Errors: () => requests.get('buggy/unauthorised'),
    get404Errors: () => requests.get('buggy/not-found'),
    get500Errors: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}


const agent = { Catalog, TestErrors, Basket }; // wrapper for the catalog

export default agent;