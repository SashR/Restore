import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Basket } from "../../models/basket";

interface RemoveItem {
    productId: number;
    quantity: number;
}

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
        },
        removeItem: (state: BasketState, action: PayloadAction<RemoveItem>) => {
            if (!state.basket) return;
            const items = [...state.basket.items]; // copy of items
            const itemIndex = items.findIndex(i => i.productId === action.payload.productId);

            if(itemIndex >=0){      // ensure item is found
                items[itemIndex].quantity -= action.payload.quantity;
                // Remove item if quantity is zero
                if(items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
                state.basket.items = items;
            }
        }
    }
});

export const {storeBasket, removeItem} = basketSlice.actions;
export default basketSlice.reducer;