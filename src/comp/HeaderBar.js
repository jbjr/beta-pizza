import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import {Toolbar, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import * as Realm from "realm-web";
import {getOrdersCollection} from "./helper";

export default function HeaderBar(){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    const pizzas = [];

    async function showCartDialog(){
        const query = {
            "user_id": user.id,
            "status": "test3"
        };
        const orderCollection = getOrdersCollection(user);
        const result = await orderCollection.findOne(query);
        result.item.forEach(pizza => {
            pizzas.push({name: pizza.name, price: pizza.price});
        })
        console.log(pizzas);
    }

    return(
        <Box sx={{flexGrow: 1, backgroundColor: 'white', boxShadow: 3}}>
            <Toolbar>
                <Button sx={{mr: 2}}><MenuIcon sx={{color: '#5d4037'}}/></Button>
                <Typography variant={"h6"} sx={{flexGrow: 1, color: '#5d4037', fontWeight: 'bold'}}>
                    Specialty Pizzas
                </Typography>
                <Button onClick={showCartDialog}><ShoppingCartIcon sx={{color: '#5d4037'}}/></Button>
            </Toolbar>
        </Box>
    )
}