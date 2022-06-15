import { Backdrop, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system";

interface Props {
    message?: string;
}

const LoadingComponent = ({message = 'Loading ...'}: Props) => {
    return (
        <Backdrop open={true} invisible={true}>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress size={100} color="secondary" />
                <Typography variant="h4" sx={{justifyContent:'center', alignItems:'center', top: '60%'}} >  
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    )
}

export default LoadingComponent;