import { ShoppingCartCheckout } from "@mui/icons-material";
import { AppBar, Badge, Box, FormControlLabel, FormGroup, IconButton, List, ListItemButton, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

interface Props {
    theme: Boolean,
    setTheme: ()=>void
}

const midLinks = [
    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contacts', path: '/contacts'},
];
const rightLinks = [
    {title: 'login', path: '/login'},
    {title: 'signup', path: '/signup'},
];

const Header = (props: Props) => {
    const {theme, setTheme} = props; 
    const textStyle = {
        textDecoration: "none",
        color: "#fff",
        borderRadius: "8px",
        margin: "1px 3px",
        '&:hover':{color:"grey.500"},
        '&.active':{color:"#ffcc00"},
        typography: "h6"
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed' sx={{mb:4}}>
                <Toolbar sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <Box sx={{display:"flex"}}>
                        <Typography  variant="h6" component={NavLink} to="/" sx={textStyle}> RE-STORE</Typography>
                        <FormGroup>
                            <FormControlLabel value={theme} control={<Switch defaultChecked />} onChange={setTheme} label={theme ? "Light" : "Dark" } />
                        </FormGroup>
                    </Box>
                    <List sx={{display:"flex"}}>
                        {midLinks.map(({title, path}) => (
                            <ListItemButton component={NavLink} to={path} sx={{...textStyle}} key={title}>
                            {title.toUpperCase()}
                    </ListItemButton>
                        ))}
                    </List>
                    <Box sx={{display:"flex"}}>
                        <IconButton size="large" sx={{color:"inherit"}} >
                            <Badge badgeContent={4} color="secondary">
                                <ShoppingCartCheckout />
                            </Badge>
                        </IconButton>
                        <List sx={{display:"flex"}}>
                            {rightLinks.map(({title, path}) => (
                                <ListItemButton component={NavLink} to={path} sx={{...textStyle}} key={title}>
                                        {title.toUpperCase()}
                                </ListItemButton>
                            ))}
                        </List>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;