import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../api/agent";
import { useStoreContext } from "../../context/StoreContext";
import NotFound from "../../errors/NotFound";
import LoadingComponent from "../../layout/LoadingComponent";
import { Product } from "../../models/product";
import { useAppSelector } from "../../store/hooks";

const ProductDetailsPage = () => {
    const {id} = useParams();
    const {basket, removeItem, setBasket} = useStoreContext();
    const {products} = useAppSelector(store => store.products);

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const basketItem = id ? basket?.items.find(it => it.productId === parseInt(id)) : null;

    const [basketQuantity, setBasketQuantity] = useState<number>(0);


    const changeQuantityHandler = (ev: any) => {
        if(ev.target.value >= 0) setBasketQuantity(parseInt(ev.target.value));
    }

    const updateQuantityHandler = async () => {
        setLoadingUpdate(true);
        try{
            const bIquantity = basketItem ? basketItem.quantity : 0;
            if(id) {
                if(bIquantity > basketQuantity){
                    await agent.Basket.removeItem(parseInt(id), bIquantity - basketQuantity);
                    removeItem(parseInt(id), bIquantity - basketQuantity);
                } else {
                    setBasket(await agent.Basket.addItem(parseInt(id), basketQuantity - bIquantity));
                }
            }
        }catch(e: any){
            console.log(e);
        }
        setLoadingUpdate(false);
    }

    useEffect(()=>{
        const p = id ? products.find((pd: Product) => pd.id === parseInt(id)) : null;
        setProduct(p ? p : null);
        setLoading(false);
        if(id) setBasketQuantity(basketItem?.quantity ?? 0);
    },[id, basketItem, products])

    if(loading) return <LoadingComponent message="Loading product ..." />;

    if(!product) return <NotFound />;

    return (
        <Grid container spacing={6} sx={{mt: 4}}>
            {/* Image */}
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3"> {product.name} </Typography>
                <Divider sx={{mb:2}} />
                <Typography variant="h4" color="secondary"> ${(product.price/100).toFixed(2)} </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell> Name: </TableCell>
                                <TableCell> {product.name} </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Description: </TableCell>
                                <TableCell> {product.description} </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Type: </TableCell>
                                <TableCell> {product.type} </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Brand: </TableCell>
                                <TableCell> {product.brand} </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Quantity in Stock: </TableCell>
                                <TableCell> {product.quantityInStock} </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={basketQuantity}
                            onChange={changeQuantityHandler}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={(!basketItem && basketQuantity === 0 ) || basketQuantity === basketItem?.quantity!}
                            sx={{height: '55px'}}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                            onClick={updateQuantityHandler}
                            loading={loadingUpdate}
                        >
                            { basketItem?.quantity! > 0 ? 'Update Quantity' : 'Add to Cart' }
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProductDetailsPage;