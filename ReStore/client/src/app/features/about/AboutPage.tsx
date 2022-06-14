import { Alert, AlertTitle, Button, ButtonGroup, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import agent from "../../api/agent";

const AboutPage = () => {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    
    const getValidationErrors = async () => {
        try {
            await agent.TestErrors.getValidationError();
        } catch(e: any) {
            setValidationErrors(e);
        }
    };

    return (
        <Container sx={{mt: 10}}>
            <Typography gutterBottom variant="h2"> Errors for testing purposes </Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Errors().catch(e=>console.log(e))}> 
                    Test 400 error 
                </Button>                                
                <Button variant='contained' onClick={() => agent.TestErrors.get401Errors().catch(e=>console.log(e))}> 
                    Test 401 error 
                </Button>                                
                <Button variant='contained' onClick={() => agent.TestErrors.get404Errors().catch(e=>console.log(e))}> 
                    Test 404 error 
                </Button>                                
                <Button variant='contained' onClick={() => agent.TestErrors.get500Errors().catch(e=>console.log(e))}> 
                    Test 500 error 
                </Button>                                
                <Button variant='contained' onClick={getValidationErrors}> 
                    Test Validation error 
                </Button>                                
            </ButtonGroup>
            {validationErrors.length > 0 && 
                <Alert severity="error">
                    <AlertTitle> Validation errors </AlertTitle>
                    <List>
                        {validationErrors.map(e => (
                            <ListItem key={e}>
                                <ListItemText> {e} </ListItemText>
                            </ListItem>))}
                    </List>
                </Alert>
            }
        </Container>
    )
}

export default AboutPage;