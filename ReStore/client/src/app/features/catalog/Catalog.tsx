import Button from '@mui/material/Button';
import ProductList from "./ProductList";
import { useEffect, useCallback } from "react";
import { Typography } from "@mui/material";
import agent from "../../api/agent";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadProducts } from "../../store/slices/productsSlice";

const Catalog = () => {
    const {products, productsLoaded} = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

    // fetch data from api
    const fetchProducts = useCallback(async () => {
      try {
        dispatch(loadProducts(await agent.Catalog.list()));
      } catch(e){
        console.log(e);
      }
    }, [dispatch]);

  // Call for data from server, no dependencies
    useEffect(()=>{
      fetchProducts();
    }, [fetchProducts])

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