import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Product, ProductParams } from "../../models/product";
import { RootState } from "../store";

export interface ProductsState {
    products: Product[];
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: 'idle' | 'starting' | 'pendingFetchProduct' | 'pendingFetchProducts';
    brands: string[];
    types: string[];
    productsParams: ProductParams;
}

const productsAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[], ProductParams>(
    'catalog/fetchProductsAsync',
    async (params, thunkAPI) => {
        try {
            return await agent.Catalog.list(params);
        } catch(e: any){
            return thunkAPI.rejectWithValue({error: e.data});
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId);
        } catch(e: any){
            return thunkAPI.rejectWithValue({error: e.data});
        }
    }
)

// Initial params for product params
const initParams = () => {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name'
    }
}

const productsSlice = createSlice({
    name: 'products',
    initialState: productsAdapter.getInitialState<ProductsState>({
        productsLoaded: false,
        products: [],
        filtersLoaded: false,
        status: 'idle',
        brands: ["Angular", "React"],
        types: ["Boots", "Boards"],
        productsParams: initParams()
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productsParams = {...state.productsParams, ...action.payload};
        },
        resetProductParams: (state) => {
            state.productsParams = initParams();
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.productsLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        });
        // Fetching single product
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
    }
    )
});

export const productsSelectors = productsAdapter.getSelectors((state:RootState)=> state.products);
export const {setProductParams, resetProductParams} = productsSlice.actions;
export default productsSlice.reducer;