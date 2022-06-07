import { Product } from "../../models/product";
import Button from '@mui/material/Button';
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const Catalog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    
    // fetch data from api
    const fetchProducts = async () => {
    try {
      const req = await fetch('http://localhost:5000/api/products');
      const resp = await req.json();
      setProducts(resp);
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