
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../models/product";

interface Props {
    product: Product,
}

const ProductCard = ({product}: Props) => {
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
                <Button size="small">Add to Card</Button>
                <Button size="small">View</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;