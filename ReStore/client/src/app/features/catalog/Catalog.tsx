import Button from '@mui/material/Button';
import ProductList from "./ProductList";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProductsAsync } from "../../store/slices/productsSlice";

const Catalog = () => {
    const {products, productsLoaded} = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

  // Call for data from server, no dependencies
    useEffect(()=>{ dispatch(fetchProductsAsync())}, [])

    return (
      <>
        { 
          !productsLoaded
          ? <LoadingComponent message="Loading products ..." />
          : (<>
            <Typography sx={{marginTop:10, marginBottom: 4}} variant="h2"> Catalog </Typography>
            <ProductList products={products} />
            <Button variant="contained" >Add product</Button>
          </>)
        }
      </>
    )
}

export default Catalog;