import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/product";
import { RootState } from "../store";

export interface ProductsState {
    products: Product[];
    productId: number | null;
    productsLoaded: boolean;
}

const initialState: ProductsState = {
    products: [],
    productId: null,
    productsLoaded: false
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        loadProducts: (state: ProductsState, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.productsLoaded = true;
        },
        setProductId: (state: ProductsState, action: PayloadAction<number>) => {
            state.productId = action.payload;
        }
    }
});

export const { loadProducts, setProductId } = productsSlice.actions;
export const getProducts = (state: RootState) => state.products.products;
export default productsSlice.reducer;