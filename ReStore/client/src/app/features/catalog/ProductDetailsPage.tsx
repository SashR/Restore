import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../api/agent";
import NotFound from "../../errors/NotFound";
import { Product } from "../../models/product";

const ProductDetailsPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                setProduct(await agent.Catalog.details(id ? parseInt(id) : 0));
            } catch(e: any){
                console.log(e);
            }
            setLoading(false);
        }
        fetchProduct();
    },[id])

    if(loading) return <Typography sx={{marginTop:10}} variant="h2"> Loading ... </Typography>;

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
            </Grid>
        </Grid>
    )
}

export default ProductDetailsPage;