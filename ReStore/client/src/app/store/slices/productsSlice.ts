import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Product } from "../../models/product";
import { RootState } from "../store";

export interface ProductsState {
    products: Product[];
    productsLoaded: boolean;
    status: 'idle' | 'starting' | 'pendingFetchProduct';
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
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle',
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.productsLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        });
    }
    )
});

export const productsSelectors = productsAdapter.getSelectors((state:RootState)=> state.products);
export default productsSlice.reducer;