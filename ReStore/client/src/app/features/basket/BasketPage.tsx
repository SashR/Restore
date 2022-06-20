import { Typography } from "@mui/material";
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
            <Typography> {basket?.buyerId} </Typography>
        </Box>
    )
}

export default BasketPage;