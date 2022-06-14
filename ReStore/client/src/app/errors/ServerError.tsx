import { Button, Divider, Paper, Typography } from "@mui/material"
import { Container } from "@mui/system";
import { useLocation } from "react-router-dom";
import { history } from "../..";

const ServerError = () => {
    // history;
    // @ts-ignore
    const {state} = useLocation<any>();
    return (
        <Container sx={{mt: 15}} component={Paper}>
            {state ? (
                <>
                    <Typography color='error' variant="h3" gutterBottom> { // @ts-ignore
                        state.title
                    } </Typography>    
                    <Divider />
                    <Typography> { // @ts-ignore
                        state.detail || 'Internal Server Errror' 
                    } </Typography>
                </>
            ) : (
                <Typography variant="h5" gutterBottom> Server error </Typography>
            )}
            <Button onClick={() => history.push('/catalog')}> Go back to the store </Button>
        </Container>
    )
}

export default ServerError;