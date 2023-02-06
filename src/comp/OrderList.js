import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import OrderTable from "./OrderTable";
import * as Realm from "realm-web";
import {getOrdersCollection} from "./helper";


export default function OrderList({items, detailsId, detailsTotal}){

    const app = Realm.App.getApp('application-0-ctrvo');
    const user = app.currentUser;

    const {id} = useParams();

    const navigate = useNavigate();

    async function handleCheckoutClick(){
        const orderCollection = getOrdersCollection(user);

        const deleteResult = await orderCollection.deleteMany({
            "user_id": user.id,
            "status": "confirmed"
        });

        console.log("Any orders that are just confirmed?  ", deleteResult);

        const query = {
            "user_id": user.id,
            "status": "pending",

        };

        const update ={
            "$set":{
                "status": "confirmed"
            }
        }
        const result = await orderCollection.findOne(query);
        console.log(result);

        const changeStatus = await orderCollection.updateOne(query, update)

        const checkResult = await orderCollection.findOne(query);
        console.log("Are there any pending orders still?  ", checkResult);

        console.log(changeStatus)

        navigate('/checkout-page');

    }

    return(
        <Box sx={{border: 1, boxShadow:10, p: 3, borderRadius: "16px", backgroundColor: 'white'}}>
            <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirect: 'row'}}>
                <LocalPizzaIcon sx={{height: 100, width: 100, m: 2}}/>
            </Box>
            <Box sx={{width: 300, display: 'flex', flexDirect: 'row'}}>
                <Typography sx={{fontWeight: 'bold', mr: 2}}>User Id:</Typography>
                <Typography>{detailsId}</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirect: 'row'}}>
                <Typography sx={{fontWeight: 'bold', mr: 2}}>Order Total:</Typography>
                <Typography>${detailsTotal}</Typography>
            </Box>
            <Typography sx={{fontWeight: 'bold', mb: 1}}>Order Details: </Typography>
            <OrderTable items={items}></OrderTable>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Button onClick={handleCheckoutClick} sx={{mt: 2}} variant={"contained"} color={"success"}>Checkout</Button>
                <Button href={'/main/' + id} sx={{my: 2}} variant={"contained"}>Return to Menu</Button>
            </Box>
        </Box>
    )
}