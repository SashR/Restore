import { AppBar, Box, FormControlLabel, FormGroup, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    theme: Boolean,
    setTheme: ()=>void
}

const Header = (props: Props) => {
    const {theme, setTheme} = props; 
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed' sx={{mb:4}}>
                <Toolbar>
                    <Typography variant="h6"> RE-STORE </Typography>
                    <FormGroup>
                        <FormControlLabel value={theme} control={<Switch defaultChecked />} onChange={setTheme} label={theme ? "Light" : "Dark" } />
                    </FormGroup>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;