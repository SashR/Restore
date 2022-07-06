
import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../api/agent";
import { useStoreContext } from "../../context/StoreContext";
import { Product } from "../../models/product";

interface Props {
    product: Product,
}

const ProductCard = ({product}: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const {setBasket} = useStoreContext();

    const addItemHandler = async (pId: any) => {
        setLoading(true);
        try {
            setBasket(await agent.Basket.addItem(pId));
        }catch(e: any){
            console.log(e);
        }
        setLoading(false);
    }

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
                <LoadingButton loading={loading} size="small" onClick={()=>addItemHandler(product.id)} >
                    Add to Cart
                    </LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;