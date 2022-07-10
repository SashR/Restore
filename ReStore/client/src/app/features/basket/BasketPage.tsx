import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addBasketItemAsync, removeBasketItemAsync } from "../../store/slices/basketSlice";
import { formatMoney } from "../../util/util";
import BasketSummary from "./BasketSummary";

const BasketPage = () => {
    const dispatch = useAppDispatch();
    const {basket, status, changeProductId} = useAppSelector(store => store.basket);
    const [multi, setMulti] = useState(false);

    const removeItemHandler = (pId: number, qty = 1, mty = false) => {
        setMulti(mty);
        dispatch(removeBasketItemAsync({productId: pId, quantity: qty}))
    };
    const addItemHandler = (pId: number) => dispatch(addBasketItemAsync({productId: pId}));

    const checkLoading = (pId: number, st: string, mty = false) => {
        return changeProductId === pId && status === st && multi === mty;
    };
    const checkDisabled = (pId: number, st: string, mty = false) => {
        return status !== 'idle' && !checkLoading(pId, st, mty);
    }

    if(!basket || basket.items.length === 0) 
        return <Typography variant="h3" sx={{mt:12}}> Your basket is empty </Typography>;

    return (
        <Box sx={{mt: 12, mb: 6}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> Product {multi ? 't' : 'f'} </TableCell>
                            <TableCell align="left"> Price </TableCell>
                            <TableCell align="center"> Quantity </TableCell>
                            <TableCell align="right"> Subtotal </TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {basket.items.map((item) => (
                        <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row"> 
                                <Box display='flex' alignItems='center'>
                                    <img src={item.pictureUrl} alt={item.name} style={{height: 50, margin: 20}} />
                                    <span> {item.name} </span>
                                </Box>
                            </TableCell>
                            <TableCell align="left"> ${(item.price/100).toFixed(2)} </TableCell>
                            <TableCell align="center">
                                <LoadingButton 
                                    loading={checkLoading(item.productId, 'pendingRemoveItem')} 
                                    disabled={checkDisabled(item.productId, 'pendingRemoveItem')}
                                    color='error' 
                                    onClick={()=>{removeItemHandler(item.productId)}} 
                                > 
                                    <Remove /> 
                                </LoadingButton>
                                <LoadingButton 
                                    loading={checkLoading(item.productId, 'pendingAddItem')} 
                                    disabled={checkDisabled(item.productId, 'pendingAddItem')}
                                    color='primary' 
                                    onClick={() => {addItemHandler(item.productId)}} 
                                > 
                                    <Add /> 
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="right"> {item.quantity} </TableCell>
                            <TableCell align="right"> {formatMoney(item.price * item.quantity)} </TableCell>
                            <TableCell align="right">
                                <LoadingButton 
                                    loading={checkLoading(item.productId, 'pendingRemoveItem',true)} 
                                    disabled={checkDisabled(item.productId, 'pendingRemoveItem', true)}
                                    color="error" 
                                    onClick={()=>{removeItemHandler(item.productId, item.quantity, true)}} 
                                >
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <BasketSummary></BasketSummary>
            <Button component={Link} to="/checkout" fullWidth size="large" variant="contained"> 
            Checkout 
            </Button>
        </Box>
    )
}

export default BasketPage;