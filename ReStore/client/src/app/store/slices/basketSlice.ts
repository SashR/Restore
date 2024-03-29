import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Basket } from "../../models/basket";
import { getCookie } from "../../util/util";
import { RootState } from "../store";

interface ItemChange {
    productId: number;
    quantity?: number;
}

export interface BasketState {
    basket: Basket | null;
    status: 'idle' | 'starting' | 'pendingAddItem' | 'pendingRemoveItem' | 'pendingFetchBasket';
    changeProductId?: number;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

// Asynchronous code
export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        const buyerId = getCookie('buyerId');
        if(buyerId){
            try {
                return await agent.Basket.get();
            } catch(e: any){
                return thunkAPI.rejectWithValue({error: e.data});
            }
        }
    }
)

export const addBasketItemAsync = createAsyncThunk<Basket, ItemChange>(
    'basket/AddBasketItemAsync',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch(e: any){
            return thunkAPI.rejectWithValue({error: e.data});
        }
    }
)

// Remove thunk function
export const removeBasketItemAsync = createAsyncThunk<null, ItemChange>(
    'basket/RemoveBasketItemAync',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            return await agent.Basket.removeItem(productId, quantity);
        } catch(e: any){
            return thunkAPI.rejectWithValue({error: e.data});
        }
    }
) 


const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        // Add item to basket actions
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.changeProductId = action.meta.arg.productId;
            state.status = 'pendingAddItem';
        });
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            console.log(action);
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });
        // Fetch basket actions
        builder.addCase(fetchBasketAsync.pending, (state) => {
            state.status = 'pendingFetchBasket';
        });
        builder.addCase(fetchBasketAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(fetchBasketAsync.rejected, (state) => {
            state.status = 'idle';
        });
        // remove action bindings
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.changeProductId = action.meta.arg.productId;
            state.status = 'pendingRemoveItem';
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, quantity} = action.meta.arg;
            console.log(action);
            const qty = quantity ? quantity : 1;
            state.status = 'idle';
            if (!state.basket) return;
            const items = [...state.basket.items]; // copy of items
            const itemIndex = items.findIndex(i => i.productId === productId);

            if(itemIndex >= 0){      // ensure item is found
                items[itemIndex].quantity -= qty;
                // Remove item if quantity is zero
                if(items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
                state.basket.items = items;
            }
        });
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });
    })
});

export default basketSlice.reducer;
export const getBasketItems = (state: RootState) => state.basket.basket?.items;