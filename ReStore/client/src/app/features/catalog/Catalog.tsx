import Button from '@mui/material/Button';
import ProductList from "./ProductList";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProductsAsync, productsSelectors } from "../../store/slices/productsSlice";

const Catalog = () => {
    const {productsLoaded, status} = useAppSelector(state => state.products);
    const products = useAppSelector(productsSelectors.selectAll);
    const dispatch = useAppDispatch();

  // Call for data from server, no dependencies
    useEffect(()=>{ 
      if(!productsLoaded) dispatch(fetchProductsAsync())
    }, [productsLoaded, dispatch]);

    if(status === 'pendingFetchProducts') return <LoadingComponent message="Loading products ..." />;

    return (
      <>
        <Typography sx={{marginTop:10, marginBottom: 4}} variant="h2"> Catalog </Typography>
        <ProductList products={products} />
        <Button variant="contained" >Add product</Button>
      </>
    )
}

export default Catalog;