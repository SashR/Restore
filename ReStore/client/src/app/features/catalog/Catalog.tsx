import { Product } from "../../models/product";
import Button from '@mui/material/Button';
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import agent from "../../api/agent";

const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    
    // fetch data from api
    const fetchProducts = async () => {
    try {
      setProducts(await agent.Catalog.list());
    } catch(e){
      console.log(e);
    }
  };

  // Call for data from server, no dependencies
    useEffect(()=>{
        fetchProducts();
    }, [])

    return (
        <>
            <Typography sx={{marginTop:10, marginBottom: 4}} variant="h2"> Catalog </Typography>
            <ProductList products={products} />
            <Button variant="contained" >Add product</Button>
        </>
    )
}

export default Catalog;