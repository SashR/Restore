import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setProductParams } from "../../store/slices/productsSlice";

const ProductSearch = () => {
    const {productsParams} = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();
    return (
        <TextField 
            label='Search products' 
            variant='outlined' 
            fullWidth 
            // value={productsParams.searchString || ''} 
            onChange={(ev:any) => dispatch(setProductParams({...productsParams, searchString: ev.target.value}))}
        />
    )
}

export default ProductSearch;