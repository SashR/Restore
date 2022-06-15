import { Product } from "../../models/product";
import Button from '@mui/material/Button';
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import agent from "../../api/agent";
import LoadingComponent from "../../layout/LoadingComponent";

const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    // fetch data from api
    const fetchProducts = async () => {
    try {
      setProducts(await agent.Catalog.list());
    } catch(e){
      console.log(e);
    }
    setLoading(false);
  };

  // Call for data from server, no dependencies
    useEffect(()=>{
        fetchProducts();
    }, [])

    if (loading) return <LoadingComponent message="Loading products ..." />;

    return (
        <>
            <Typography sx={{marginTop:10, marginBottom: 4}} variant="h2"> Catalog </Typography>
            <ProductList products={products} />
            <Button variant="contained" >Add product</Button>
        </>
    )
}

export default Catalog;