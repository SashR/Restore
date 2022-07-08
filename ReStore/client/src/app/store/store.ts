import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/contact/counterSlice";
import productsReducer from "./slices/productsSlice";
import basketReducer from "./slices/basketSlice";

// export function storeConfig(){
//     return configureStore({
//         reducer: {
//             counter: counterReducer
//         }
//     });
// }

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        products: productsReducer,
        basket: basketReducer
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch