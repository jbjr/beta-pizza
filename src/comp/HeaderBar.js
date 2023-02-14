import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import {Toolbar, Tooltip, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import * as Realm from "realm-web";
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

export default function HeaderBar(){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    const navigate = useNavigate()

    function toCart(){
        navigate("/cart-page/" + user.id);
    }
    function toLogin(){
        navigate('/');
    }

    return(
        <Box sx={{flexGrow: 1, backgroundColor: 'white', boxShadow: 3}}>
            <Toolbar>
                <Tooltip title={"Logout"}>
                    <Button onClick={toLogin} sx={{mr: 2}}>
                        <LogoutIcon sx={{color: '#5d4037'}}/>
                    </Button>
                </Tooltip>
                <Typography variant={"h6"} sx={{textAlign: 'center', flexGrow: 1, color: '#5d4037', fontWeight: 'bold'}}>
                    Specialty Pizzas
                </Typography>
                <Tooltip title={"Cart"}>
                    <Button onClick={toCart}>
                        <ShoppingCartIcon sx={{color: '#5d4037'}}/>
                    </Button>
                </Tooltip>
            </Toolbar>
        </Box>
    )
}