import { Product } from "../../models/product";
import Button from '@mui/material/Button';
import ProductList from "./ProductList";

interface Props {
    products: Product[],
    addProduct: () => void,  // function that returns void
}

const Catalog = (props: Props) => {
    const {products, addProduct} = props;
    return (
        <>
            <h1 style={{marginTop:100}}> Catalog </h1>
            <ProductList products={products} />
            <Button variant="contained" onClick={addProduct} >Add product</Button>
        </>
    )
}

export default Catalog;