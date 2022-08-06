import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Product } from "../../models/product";
import { RootState } from "../store";

export interface ProductsState {
    products: Product[];
    productsLoaded: boolean;
}

const initialState: ProductsState = {
    products: [],
    productsLoaded: false
}

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async () => {
        try {
            return await agent.Catalog.list();
        } catch(e){
            console.log(e);
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        loadProducts: (state: ProductsState, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.productsLoaded = true;
        }
    }
});

export const { loadProducts} = productsSlice.actions;
export const getProducts = (state: RootState) => state.products.products;
export default productsSlice.reducer;