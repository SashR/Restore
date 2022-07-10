import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../models/product";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addBasketItemAsync } from "../../store/slices/basketSlice";

interface Props {
    product: Product,
}

const ProductCard = ({product}: Props) => {
    const {status, changeProductId} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    // Add item to cart
    const addItemHandler = () => dispatch(addBasketItemAsync({productId: product.id}));

    return (
        <Card>
            <CardHeader 
                titleTypographyProps={{sx:{fontWeight: 'bold', color: 'primary.main'}}} 
                title={product.name} 
                avatar={<Avatar sx={{bgcolor:'secondary.main'}}> {product.name.charAt(0).toUpperCase()} </Avatar>}
            />
            <CardMedia 
                sx={{backgroundSize:'contain', bgcolor:'primary.light'}} 
                component="img" height="140" 
                image={product.pictureUrl} 
                alt={product.name} 
            />
            <CardContent>
                <Typography gutterBottom variant="h5"> ${(product.price/100).toFixed(2)} </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                    loading={status === 'pendingAddItem' && product.id === changeProductId} 
                    size="small" 
                    onClick={addItemHandler} >
                    Add to Cart
                    </LoadingButton>
                <Button 
                    component={Link} 
                    to={`/catalog/${product.id}`} 
                    size="small"
                >
                    View
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;