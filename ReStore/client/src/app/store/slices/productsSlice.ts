import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Product } from "../../models/product";
import { RootState } from "../store";

export interface ProductsState {
    products: Product[];
    productsLoaded: boolean;
    status: 'idle' | 'starting' | 'pendingFetchProduct';
}

const initialState: ProductsState = {
    products: [],
    productsLoaded: false,
    status: 'idle'
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
        // products<Product[]>: [],
    }),
    reducers: {
        // loadProducts: (state: ProductsState, action: PayloadAction<Product[]>) => {
        //     state.products = action.payload;
        //     state.productsLoaded = true;
        // }
    },
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

// export const { loadProducts} = productsSlice.actions;
// export const getProducts = (state: RootState) => state.products.products;
export default productsSlice.reducer;