import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
    // we get the basket back when adding an item, so we can use setItem for that
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

// Custom react hook to use context easily
export const useStoreContext = () => {
    const context = useContext(StoreContext);
    if (context === undefined){
        throw Error('Not inside provider');
    }

    return context;
}

export const StoreProvider = ({children} : PropsWithChildren<any> ) => {
    const [basket, setBasket] = useState<Basket | null>(null);

    const removeItem = (productId: number, quantity=1) => {
        if(!basket) return; // no basket
        const items = [...basket.items]; // copy of items
        const itemIndex = items.findIndex(i => i.productId === productId);
        if(itemIndex >=0){      // ensure item is found
            items[itemIndex].quantity -= quantity;
            // Remove item if quantity is zero
            if(items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBasket((prevState: any) => { return {...prevState, items}});
        }
    }

    return (
        <StoreContext.Provider value={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}