import { Grid } from "@mui/material";
import { Product } from "../../models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[],
}

const ProductList = ({products}: Props) => {
    return (
        <Grid container spacing={4}>
            {products.map((product) => (
                <Grid item xs={4} key={product.id}>
                   <ProductCard product={product} key={product.id} />
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductList;