import Box from "@mui/material/Box";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import {Typography} from "@mui/material";
import PayPal from "./PayPal";

export default function CheckoutHeader({user, orderTotal}){

    return(
        <Box>
            <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirect: 'row'}}>
                <LocalPizzaIcon sx={{height: 100, width: 100, m: 2}}/>
            </Box>
            <Box sx={{width: 300, display: 'flex', flexDirect: 'row'}}>
                <Typography sx={{fontWeight: 'bold', mr: 2}}>User Id:</Typography>
                <Typography>{user}</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirect: 'row'}}>
                <Typography sx={{fontWeight: 'bold', mr: 2}}>Order Total:</Typography>
                <Typography>${orderTotal}</Typography>
            </Box>
            <PayPal total={orderTotal}/>
        </Box>
    )
}