import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Basket } from "../../models/basket";

export interface BasketState {
    basket: Basket | null;
}

const initialState: BasketState = {
    basket: null
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        storeBasket: (state: BasketState, action: PayloadAction<Basket>) => {
            state.basket = action.payload;
        }
    }
});

export const {storeBasket} = basketSlice.actions;
export default basketSlice.reducer;