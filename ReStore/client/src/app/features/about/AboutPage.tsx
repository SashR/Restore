import { Button, ButtonGroup, Typography } from "@mui/material";
import { Container } from "@mui/system";
import agent from "../../api/agent";

const AboutPage = () => {
    return (
        <Container>
            <Typography gutterBottom variant="h2"> Errors for testing purposes </Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Errors()}> Test 400 error </Button>                                
                <Button variant='contained' onClick={() => agent.TestErrors.get401Errors()}> Test 401 error </Button>                                
                <Button variant='contained' onClick={() => agent.TestErrors.get404Errors()}> Test 404 error </Button>                                
                <Button variant='contained' onClick={() => agent.TestErrors.get500Errors()}> Test 500 error </Button>                                
                <Button variant='contained' onClick={() => agent.TestErrors.getValidationError()}> Test Validation error </Button>                                
            </ButtonGroup>
        </Container>
    )
}

export default AboutPage;