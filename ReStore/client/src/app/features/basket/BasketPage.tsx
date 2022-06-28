import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import agent from "../../api/agent";
import { useStoreContext } from "../../context/StoreContext";
import { formatMoney } from "../../util/util";
import BasketSummary from "./BasketSummary";

interface LoadingDetails {
    id : number;
    type : string;
    value : boolean;
}

const BasketPage = () => {
    const { basket, removeItem, setBasket } = useStoreContext();
    const [loading, setLoading] = useState<LoadingDetails>();

    const removeItemHandler = async (pId: number, qty = 1, type = 'rem') => {
        setLoading({value: true, id: pId, type: type});
        try{
            await agent.Basket.removeItem(pId, qty);
            removeItem(pId, qty);
        }catch(e: any){
            console.log(e);
        }
        setLoading({value: false, id: pId, type: 'rem'});
    }

    const addItemHandler = async (pId: any) => {
        setLoading({value: true, id: pId, type: 'add'});
        try {
            setBasket(await agent.Basket.addItem(pId));
        }catch(e: any){
            console.log(e);
        }
        setLoading({value: false, id: pId, type: 'add'});
    }

    if(!basket) return <Typography sx={{mt:12}}> Your basket is empty </Typography>;

    return (
        <Box sx={{mt: 12}}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> Product </TableCell>
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
                                    loading={loading?.value && loading.id === item.productId && loading.type === "rem"}
                                    disabled={loading?.value && (loading.id !== item.productId || loading.type !== "rem")} 
                                    color='error' 
                                    onClick={()=>{removeItemHandler(item.productId)}} 
                                > 
                                    <Remove /> 
                                </LoadingButton>
                                <LoadingButton 
                                    loading={loading?.value && loading.id === item.productId && loading.type === "add"} 
                                    disabled={loading?.value && (loading.id !== item.productId || loading.type !== "add")}
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
                                    loading={loading?.value && loading.id === item.productId && loading.type === "remall"} 
                                    disabled={loading?.value && (loading.id !== item.productId || loading.type !== "remall")}
                                    color="error" 
                                    onClick={()=>{removeItemHandler(item.productId, item.quantity, 'remall')}} 
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
        </Box>
    )
}

export default BasketPage;