import { Button, Divider, Paper, Typography } from "@mui/material"
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <Container component={Paper} sx={{mt:15, height:400}}>
            <Typography gutterBottom variant="h3"> Oops - We could not find what you are looking for! </Typography>
            <Divider></Divider>
            <Button fullWidth component={Link} to='/catalog'> Go back to shop </Button>
        </Container>
    )
}

export default NotFound;