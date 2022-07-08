import { Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { decrement, increment } from "./counterSlice";


const ContactPage = () => {
    const {value, title} = useAppSelector(state => state.counter);
    const dispatch = useAppDispatch();

    console.log("data: ", value);
    return (
        <>
            <Typography sx={{marginTop:10}} variant="h2"> 
                {title}
            </Typography>
            <Typography sx={{marginTop:3}} variant="h5"> 
                The data is {value}
            </Typography>
            <Button onClick={()=> dispatch(increment())}> Add </Button>
            <Button onClick={()=> dispatch(decrement())}> Sub </Button>
        </>
    )
}

export default ContactPage;