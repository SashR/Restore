import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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