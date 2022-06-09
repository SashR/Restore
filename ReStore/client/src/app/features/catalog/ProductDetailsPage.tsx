import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../models/product";

const ProductDetailsPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const resp = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(resp.data);
            } catch(e){
                console.log(e);
            }
            setLoading(false);
        }
        fetchProduct();
    },[id])

    if(loading) return <Typography sx={{marginTop:10}} variant="h2"> Loading ... </Typography>;

    if(!product) return <Typography sx={{marginTop:10}} variant="h2"> No product </Typography>;

    return (
        <Typography sx={{marginTop:10}} variant="h2"> {product.name} </Typography>
    )
}

export default ProductDetailsPage;