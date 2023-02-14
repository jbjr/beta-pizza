import Box from "@mui/material/Box";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import {Typography} from "@mui/material";
import PayPal from "./PayPal";
import * as Realm from "realm-web";

export default function CheckoutHeader({orderTotal}){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    return(
        <Box>
            <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirect: 'row'}}>
                <LocalPizzaIcon sx={{height: 100, width: 100, m: 2}}/>
            </Box>
            <Box sx={{width: 300, display: 'flex', flexDirect: 'row'}}>
                <Typography sx={{fontWeight: 'bold', mr: 2}}>User Email:</Typography>
                <Typography>{user.profile.email}</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirect: 'row'}}>
                <Typography sx={{fontWeight: 'bold', mr: 2}}>Order Total:</Typography>
                <Typography>${orderTotal}</Typography>
            </Box>
            <PayPal total={orderTotal}/>
        </Box>
    )
}