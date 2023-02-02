import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import {Toolbar, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import * as Realm from "realm-web";
import {useNavigate} from "react-router-dom";

export default function HeaderBar(){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    const navigate = useNavigate()

    function toCart(){
        navigate("/cart-page/" + user.id);
    }

    return(
        <Box sx={{flexGrow: 1, backgroundColor: 'white', boxShadow: 3}}>
            <Toolbar>
                <Button sx={{mr: 2}}><MenuIcon sx={{color: '#5d4037'}}/></Button>
                <Typography variant={"h6"} sx={{flexGrow: 1, color: '#5d4037', fontWeight: 'bold'}}>
                    Specialty Pizzas
                </Typography>
                <Button onClick={toCart}>
                    <ShoppingCartIcon sx={{color: '#5d4037'}}/>
                </Button>
            </Toolbar>
        </Box>
    )
}