import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
    return (
        <AppBar position='fixed' sx={{mb:4}}>
            <Toolbar>
                <Typography variant="h6"> RE-STORE </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;