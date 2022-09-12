import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setProductParams } from "../../store/slices/productsSlice";

const ProductSearch = () => {
    const {productsParams} = useAppSelector(state => state.products);
    const [searchString, setSearchString] = useState(productsParams.searchString);
    const dispatch = useAppDispatch();

    const debounceSearch = debounce((ev:any) => {
        dispatch(setProductParams({...productsParams, searchString: ev.target.value}));
    },1000);

    return (
        <TextField 
            label='Search products' 
            variant='outlined' 
            fullWidth 
            value={searchString || ''} 
            onChange={(ev:any) => {
                setSearchString(ev.target.value);
                debounceSearch(ev);
            }}
        />
    )
}

export default ProductSearch;