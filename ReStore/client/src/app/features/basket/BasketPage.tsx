import { Delete } from "@mui/icons-material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import LoadingComponent from "../../layout/LoadingComponent";
import { Basket } from "../../models/basket";

const BasketPage = () => {
    const [loading, setLoading] = useState<Boolean>(true);
    const [basket, setBasket] = useState<Basket | null>(null);

    const fetchBasket = async () => {
        try {
            setBasket(await agent.Basket.get());
        } catch(e: any) {
            console.log(e);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchBasket();
    }, []);

    if(loading) return <LoadingComponent message="Loading basket ..." />;

    if(!basket) return <Typography sx={{mt:12}}> Your basket is empty </Typography>;

    return (
        <Box sx={{mt: 12}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> Product </TableCell>
                            <TableCell align="right"> Price </TableCell>
                            <TableCell align="right"> Quantity </TableCell>
                            <TableCell align="right"> Subtotal </TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {basket.items.map((item) => (
                        <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row"> {item.name} </TableCell>
                            <TableCell align="right"> ${(item.price/100).toFixed(2)} </TableCell>
                            <TableCell align="right"> {item.quantity} </TableCell>
                            <TableCell align="right"> {(item.price * item.quantity/100).toFixed(2)} </TableCell>
                            <TableCell align="right">
                                <IconButton color="error">
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </Box>
    )
}

export default BasketPage;