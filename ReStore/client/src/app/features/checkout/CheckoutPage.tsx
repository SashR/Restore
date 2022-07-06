import { Box, Typography } from "@mui/material"

const CheckoutPage = (props: any) => {
    return (
        <Box sx={{mt: 12}}>
            <Typography variant="h3"> 
                Only logged in users need to be able to view this!!!
            </Typography>
        </Box>
    )
}

export default CheckoutPage;